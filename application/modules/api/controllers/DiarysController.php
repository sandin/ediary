<?php

class Api_DiarysController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->_helper->JsonHelper->setNoView();
        
        // OAuth
        /*
        $server = Ediary_OAuth_Server::getInstance();
        try {
            $req = OAuthRequest::from_request();
            // $token access token, TODO: 利用该token查找user id
            list($consumer, $token) = $server->verify_request($req);

            // lsit back the non-OAuth params
            $total = array();
            foreach($req->get_parameters() as $k => $v) {
                if (substr($k, 0, 5) == "oauth") continue;
                $total[] = urlencode($k) . "=" . urlencode($v);
            }
            print implode("&", $total);
        } catch (OAuthException $e) {
            echo $this->_helper->json(array('error' => $e->getMessage()));
            //var_dump($req);
            die();
        }
        */
    }

    public function indexAction()
    {
        // action body
    }

    /**
     * 获取一篇日记
     * 
     * 请求: POST/GET
     * 	id: Int, 日记ID, 必须
     *  
     * 返回: JSON
     * 	diary: Array, 日记主体(标题,内容等)
     *  error: String, 错误信息(如果出现出错才会返回此参数)
     */
    public function getAction()
    {
        // action body
        $result = array('diary' => array());
        $input = new Zend_Filter_Input(array('id' => 'Int'),
                                       array('id' => array( 'presence' => 'required')),
                                       $this->getRequest()->getParams());
        if ($input->isValid() && !$input->hasMissing()) {
            $diary = Ediary_Diary::find($input->id);
            if ($diary != null && $diary->user_id == $this->_user->id) {
                $result['diary'] = $diary->toArray(true);
            } else {
                $result['error'] = '无此日记,或无权访问.';
            }
        } else {
            $result['error'] = 'Params invalid: id.';
        }
        
        echo $this->view->json($result);
    }

    /**
     * 创建一篇日记
     * 
     * 请求: POST/GET
     *  title: String 日记标题
     *  content: String 日记内容
     *  
     * 返回: JSON
     * 	diary: Array 刚创建的日记主体, 含(ID,标题,内容等)
     *  error: String 错误信息(如果存在错误) 
     *  
     * Enter description here ...
     */
    public function postAction()
    {
        // action body
        $result = array('diary' => array());
        $input = $this->_getFilterInput();
        if ($input->isValid() && !$input->hasMissing()) {
             $data = array(
                'user_id' => 3, // TODO: user id
                "title" => $input->title,
                "content" => $input->getUnescaped('content') // it's safe, stripTags instead escape
            );
            $diary = Ediary_Diary::create($data);
            $result['diary'] = $diary->toArray(true);
        } else {
            $result['error'] = 'Params invalid: title or content.';
        }
        echo $this->view->json($result);
    }
    
    /**
     * Update
     */
    public function putAction() {}
    
    public function deleteAction() {}
    
      /**
     * Filter Post Data
     * 
     * @return Zend_Filter_Input
     */
    private function _getFilterInput($isCreate = true) {
        //$_POST['diary']['content'] = html_entity_decode($_POST['diary']['content']);
        
        $stripTagsFilter = new Zend_Filter_StripTags();
        $stripTagsFilter->setTagsAllowed(array("p"));
        
        $filter = array(
            'title' => 'StripTags',
            'content' => $stripTagsFilter
        );
        // 创建日记时不需要ID, 更新时才需要
        if (!$isCreate) {
            $filter['id'] = 'Int';
        }
        $validator = array(
            '*' => array( 'presence' => 'required')
        );
        return new Zend_Filter_Input($filter, $validator, $this->getRequest()->getParams());
    } 

}





