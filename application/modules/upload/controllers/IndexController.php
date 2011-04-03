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

    /**
     * Get all files of a particular diary
     * 
     * REQUEST: GET
     * 	diary_id int
     * 
     * RESPONSE:
     *  html part
     */
    public function indexAction()
    {
        $this->_helper->layout->disableLayout();
        
        // 为了兼容性, 可以提供 "?diary[id]=xxx" , 或只提供 "?id=xxx"
        $request = (isset($_GET['diary'])) ? $_GET['diary'] : $_GET;
        $input = new Zend_Filter_Input(array('id' => 'Int'),
                                       array('id' => array( 'presence' => 'required')),
                                       $request);
        if ($input->isValid() && !$input->hasMissing() 
            && Ediary_Diary::checkAccess($input->id, $this->_user->id))
        {
            $files = Ediary_File::getFilesOfDiary($input->id);
            $this->view->files = $files;
        } else {
            // display nothing when input invalid
            $this->_helper->viewRenderer->setNoRender();
        }
    }
    
    /**
     * Upload a image
     * 
     * REQUEST: POST
     * 	diary_id int
     *  Filedata file <input type="file" name="Filedata" />
     *  
     * RESPONSE:
     * 	{
     * 	  id: int, 			// 文件id
     *    filename: String, // 文件名(不含路径)
     *    origin: String,   // 原始图片地址
     *    small : String    // 缩略图地址
     *  }
     *  
     */
    public function imagesAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        $input = new Zend_Filter_Input(array('diary_id' => 'Int'),
                                       array('diary_id' => array( 'presence' => 'required')),
                                       $_POST);
        if ($input->isValid() && !$input->hasMissing()) {
            // Make Sure this diary is belong to current user
            $diary = Ediary_Diary::find($input->diary_id);
            
            if ($diary != null && $diary->user_id == $this->_user->id) {
                // Recevie and Move file to the upload dir
                $upload = new Ediary_Upload_Images(APPLICATION_PATH . '/../public/uploads');
                $upload->useSubDir(true);
                if (! $upload->recevie('Filedata') ) {
                    // File is invalid
                   $this->_helper->json(array('error' => $upload->getError())); 
                   return;
                }
                
                // Store file info into DB
                $fileInfo = $upload->store($this->_user->id, $diary->id);
                if ( $fileInfo != null ) {
                    // Make thumbnail
                    $image = new Ediary_Image($upload->getFilename());
                    $thumb = $image->thumbnail(160, 120, '{$1}_thumbnail');
                    
                    $response = array(
                        'id' => $fileInfo['id'],
                        'filename' => $fileInfo['filename'],
                		'origin' => $fileInfo['filepath'],
                		'small' => Ediary_Upload::getRelativePath($thumb)
                    );
                    $this->_helper->json($response);
                } 
            }
        }
    }
    
    /**
     * Delete a file
     * 
     * REQUEST: GET
     * 	id 
     * 
     * RESPONSE:
     *  { status : boolean } or NULL
     */
    public function deleteAction() {
        $this->_helper->jsonHelper->setNoView();
        $response = array();
        $input = new Zend_Filter_Input(array('id' => 'Int'),
                                       array('id' => array( 'presence' => 'required')),
                                       $_GET);
        if ($input->isValid() && !$input->hasMissing()) {
            $file = Ediary_File::find($input->id);
            if ($file != null && $file->user_id == $this->_user->id) {
                $response['status'] = $file->delete();
            }
        }
        $this->_helper->json($response);
    }


}

