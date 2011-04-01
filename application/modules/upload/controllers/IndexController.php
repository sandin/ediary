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
        $this->_helper->layout->disableLayout();
    }
    
    public function imagesAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        $input = new Zend_Filter_Input(array('diary_id' => 'Int'),
                                       array('diary_id' => array( 'presence' => 'required')),
                                       $_REQUEST);
        if ($input->isValid() && !$input->hasMissing()) {
            // Make Sure this diary is belong to current user
            $diary = Ediary_Diary::find($input->diary_id);
            if ($diary != null && $diary->user_id == $this->_user->id) {
                $upload = new Ediary_Upload(APPLICATION_PATH . '/../public/uploads');
                $upload->useSubDir(true);
                $upload->recevie('Filedata'); // uploadify file field name
                $result = $upload->store($this->_user->id, $diary->id);
                
                if ($result) {
                    $file = $upload->getAdapter()->getFilename();
                    $image = new Ediary_Image($file);
                    $thumb = $image->thumbnail(120, 0, '{$1}_thumbnail');
                    $response = array(
                		'origin' => Ediary_Upload::getRelativePath($file),
                		'small' => Ediary_Upload::getRelativePath($thumb)
                    );
                    $this->_helper->json($response);
                } 
            }
        }
    }


}

