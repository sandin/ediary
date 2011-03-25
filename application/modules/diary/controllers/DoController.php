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

    public function saveAction()
    {
        // NEED POST [id, title, content]
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
            
            echo json_encode($response);
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

