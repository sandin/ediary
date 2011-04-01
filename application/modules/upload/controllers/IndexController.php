<?php

class Upload_IndexController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        $this->_user = Zend_Registry::get('user');
        if (!isset($this->_user)) {
			$this->_redirect('/login');
		};
    }

    public function indexAction()
    {
        // action body
    }
    
    public function imagesAction()
    {
        $upload = new Ediary_Upload(APPLICATION_PATH . '/../public/uploads');
        $upload->useSubDir(true);
        $upload->recevie('Filedata'); // uploadify file field name
        $result = $upload->store($this->_user->id);
        
        $response = array(
            'result' => $result
        );
        
        $this->_helper->json($response);
        
    }


}

