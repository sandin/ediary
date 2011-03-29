<?php

class Diary_DoController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        $this->_helper->viewRenderer->setNoRender();
        $this->_helper->layout->disableLayout();
        
        $this->_user = Zend_Registry::get('user');
    }

    public function indexAction()
    {
        // action body
    }
    
    /**
     * Filter Post Data
     * 
     * @param array $post $_POST
     * @return Zend_Filter_Input
     */
    private function filterPost($post) {
        //$_POST['diary']['content'] = html_entity_decode($_POST['diary']['content']);
        
        $stripTagsFilter = new Zend_Filter_StripTags();
        $stripTagsFilter->setTagsAllowed(array("p"));
        
        $filter = array(
            'id' => 'Int',
            'title' => 'StripTags',
            'content' => $stripTagsFilter
        );
        $validator = array();
        return new Zend_Filter_Input($filter, $validator, $_POST['diary']);
    } 

    /**
     * Create or Update diary
     * 
     * REQUEST:
     *  diary: {
     *  	id: int,
     *  	title: string,
     *  	content: string
     *  }
     *  
     * RESPONSE:
     * {
     * 	diary: diary object,
     *  callback: calback function name, 
     *  error: error message,
     * }
     * or NULL
     */
    public function saveAction()
    {
        // NEED POST diary [id, title, content]
        if (! isset($_POST['diary']) ) {
            return;
        }

        $input = $this->filterPost($_POST);
        if ($input->isValid() && !$input->hasMissing()) {
            //TODO: 检查权限
            
            $response = array();
            $data = array(
            	"id" => $input->id,
                "title" => $input->title,
                "content" => $input->getUnescaped('content') // it's safe, stripTags instead escape
            );
            
            if ('-1' == $data['id']) {
                // create 
                unset($data['id']);
                $data['user_id'] = $this->_user->id;
                $diary = Ediary_Diary::create($data);
                if ($diary->id <= 0) {
                    $response['error'] = _t("无法新建日记.");
                }
                $response['callback'] = 'updateId';
            } else {
                // update 
                $diary = Ediary_Diary::find($data['id']);
                $diary->title = $data['title'];
                $diary->content = $data['content'];
                if (! $diary->update() ) {
                    $response['error'] = _t("无法新建日记.");
                }
            }
            if (!isset($response['error'])) {
                $response['diary'] = $diary->toArray();
            }
            
            echo $this->view->json($response);
        }
    }
    
    /**
     * Get a particular diary by ID
     * 
     * REQUEST:
     *  id int diary id [required]
     *  
     * RESPONSE:
     * {
     *  diary : diary object
     * }
     * or NULL
     */
    public function getAction() {
        $input = new Zend_Filter_Input(array('id' => 'Int'), array(), $this->getRequest()->getParams());
        if ($input->isValid() && !$input->hasMissing()) {
            $id = $input->id;
            $diary = Ediary_Diary::find($id);
            if ($diary != null && $diary->user_id == $this->_user->id) {
                echo $this->view->json( array('diary' => $diary->toArray(true)) );
            }
        }
    }
    
    /**
     * Get a particular user's diarys
     * 
     * REQUEST:
     * 	count int diarys number
     *  page  int page number
     *  since Date 'yyyy-mm-dd' 
     *  max   Date 'yyyy-mm-dd'
     *  
     * RESPONSE:
     *  {
     *  	'diarys' : [] // diarys list
     *  	'current_page' : int
     *  	'total_page'   : int
     *  	'total_diarys' : int
     *  } 
     *  如果没有日记, 返回信息依然是一条json, 只是diarys为空, []
     * 
     */
    public function userdiarysAction() {
        $filterRules = array(
            'count' => 'Int',
            'page'  => 'Int',
            'since' => 'StringTrim',
            'max'   => 'StringTrim'
        );
        $dateValidate = Ediary_Formator::getDateValidate();
        $validatorRules = array();
        $input = new Zend_Filter_Input($filterRules, $validatorRules, $this->_request->getParams());
        
        // since和max为可选, 但如果提供就必须符合 0000-00-00 格式
        /*
        $dataValidator = Ediary_Formator::getDateValidate();
        if ( (isset($input->since) && !$dataValidator->isValid($input->since))
          || (isset($input->max) && !$dataValidator->isValid($input->max)) ) {
            return;
        }
        */
        
        //var_dump($input->getUnescaped());
        //var_dump($input->isValid());
        if ($input->isValid()) {
            $page  = (isset($input->page)) ? $input->page : 1;
            $count = (isset($input->count)) ? $input->count : 10;
            $since = (isset($input->since)) ? Ediary_Formator::addTime($input->since) : null;
            $max   = (isset($input->max))  ? Ediary_Formator::addTime($input->max, true) : null;
            $paginator = Ediary_Diary::getDiarysPaginator($this->_user->id, $page, $count, $since, $max);
            
            $diarys = array();
            foreach ($paginator as $item) {
                $diarys[] = array(
                    'id'       => $item['id'],
                    'title'    => $this->view->escape($item['title']),
                    'content'  => $this->view->substr(trim(strip_tags($item['content'])), 50),
                    'saved_at' => $item['saved_at']
                );
            }
            $response = array(
            	'diarys' => $diarys,
                'current_page' => $paginator->getCurrentPageNumber(),
                'total_page' => $paginator->count(),
                'total_diarys' => $paginator->getTotalItemCount()
            );
            echo $this->view->json($response);
        }
    }
    
    /**
     * Delete a particular diary
     * 
     * REQUEST:
     * 	id int diary id
     * 
     * RESPONSE:
     * 	{'result' : true} on success
     *  or return NULL on fail
     */
    public function deleteAction() {
        $input = new Zend_Filter_Input(array('id' => 'Int'), array(), $this->_request->getParams());
        if ($input->isValid() && !$input->hasMissing()) {
            $diary = Ediary_Diary::find($input->id);
            if (isset($diary) && $diary->user_id == $this->_user->id) {
                $result = $diary->delete();
                echo $this->view->json(array('result' => $result));
            }
        }
    }
    
    private function createDiary($data) {
    }
    
    private function updateDiary($data) {
    }

    public function createAction() {
        $params = $this->_parsePost();
        $diary = Ediary_Diary::create($params);
        Ediary_Response::send($diary->toArray());
    }

    public function updateAction() {
        $params = $this->_parsePost();
        $diary = Ediary_Diary::update($params);
        Ediary_Response::send($diary->toArray());
    }


}

