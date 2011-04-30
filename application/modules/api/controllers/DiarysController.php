<?php

/**
 * FIXME: 因为OAuth-php库的BUG, 签名不支持使用HMAC_SHA1
 * @author lds
 *
 */
class Api_DiarysController extends Zend_Controller_Action
{
    private $logger;
    
    public function init()
    {
        /* Initialize action controller here */
        $this->logger = Ediary_Logger::getLogger();
        $this->_helper->JsonHelper->setNoView();
        $this->_user = Ediary_OAuth::authOrExit();
        $ip = $this-> getRequest()-> getServer('REMOTE_ADDR'); 
    }

    public function indexAction()
    {
        // action body
        // Zend_Rest_Route 在这里BUG, get 不是直接到 getAction, 而是会被indexAction拦截
        $this->_forward('get');
    }

    /**
     * 获取一篇日记
     * 
     * 请求: GET
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
                $result['error'] = 'No such diary, or you cann\'t access it.';
            }
        } else {
            $result['error'] = 'Params invalid: id.';
        }
        
        echo $this->view->json($result);
    }

    /**
     * 创建一篇日记
     * 
     * 请求: POST
     *  title: String 日记标题
     *  content: String 日记内容
     *  
     * 返回: JSON
     * 	diary: Array 刚创建的日记主体, 含(ID,标题,内容等)
     *  error: String 错误信息(如果存在错误) 
     *  
     */
    public function postAction()
    {
        // action body
        $result = array('diary' => array());
        $input = $this->_getFilterInput();
        if ($input->isValid() && !$input->hasMissing()) {
            $data = array(
                'user_id' => $this->_user->id,
                "title" => $input->title,
                "content" => $input->getUnescaped('content') // it's safe, stripTags instead escape
            );
            // 超级终端有权代理更新任何用户的日记
            if (null != $input->email && Ediary_Auth::isSuperUser($this->_user)) {
                $data = $this->superClientHack($data, $input->email);
            }
            $diary = Ediary_Diary::create($data);
            $result['diary'] = $diary->toArray(true);
        } else {
            $result['error'] = 'Params invalid: title or content.';
        }
        echo $this->view->json($result);
    }
    
    private function superClientHack($data, $email) {
        $targetUser = Ediary_User::find($email);
        if (null != $targetUser) {
            $data['user_id'] = $targetUser->id;
        } else {
            echo $this->view->json(array("error" => $email . ' is not exsits.'));
            exit(); // 指定的Email用户不存在
        }
        return $data;
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
        $stripTagsFilter->setTagsAllowed(array("p", "div"));
        
        $replaceFilter = new Zend_Filter_PregReplace();
        $replaceFilter->setMatchPattern(array('/\<div\>/', '/\<\/div\>/'))
                      ->setReplacement(array('<p>', '</p>'));
       
        $filter = array(
            'title' => 'StripTags',
            'content' => array($stripTagsFilter,$replaceFilter),
            'email' => 'StringTrim'
        );
        // 创建日记时不需要ID, 更新时才需要
        if (!$isCreate) {
            $filter['id'] = 'Int';
        }
        $validator = array(
            'title' => array( 'presence' => 'required'),
            'content' => array( 'presence' => 'required'),
            'email' => array( 'presence' => 'optional') // 可选
        );
        return new Zend_Filter_Input($filter, $validator, $this->getRequest()->getParams());
    } 

}





