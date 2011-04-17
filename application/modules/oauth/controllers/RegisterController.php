<?php

class Oauth_RegisterController extends Zend_Controller_Action
{

    private $_user = null;
    private $_store = null;

    public function init()
    {
        /* Initialize action controller here */
        Ediary_Auth::authRedirect();
        $this->_user = Ediary_Auth::getUser();
        
        $db = Ediary_Db::getInstance();
        $this->_store = OAuthStore::instance('PDO',
                                array('conn' => $db->getAdapter()->getConnection()));
    }

    /**
     * 给当前登录用户注册一个API key/secret
     */
    public function indexAction()
    {
        // 一个用户只允许注册一个API KEY
        $consumers = $this->_store->listConsumers($this->_user->id);
        if (count($consumers) > 0) {
            return $this->_helper->Redirector->gotoSimple('list');
        }
        
        // This should come from a form filled in by the requesting user
        $consumer = array(
        // These two are required
    		'requester_name' => $this->_user->email,
    		'requester_email' => $this->_user->email,

        // These are all optional
    		'callback_uri' => 'http://yiriji.com/oauth/callback',
    		'application_uri' => 'http://www.eriji.com/',
    		//'application_title' => '宜日记',
    		//'application_descr' => '',
    		//'application_notes' => 'Bladibla',
    		//'application_type' => 'website',
    		//'application_commercial' => 0
        );

        // Register the consumer
        $key   = $this->_store->updateConsumer($consumer, $this->_user->id);

        // Get the complete consumer from the store
        $consumer = $this->_store->getConsumer($key, true);

        // Some interesting fields, the user will need the key and secret
        $consumer_id = $consumer['id'];
        $consumer_key = $consumer['consumer_key'];
        $consumer_secret = $consumer['consumer_secret'];
        
        if (null != $consumer) {
            return $this->_helper->Redirector->gotoSimple('list');
        }
    }

    public function listAction()
    {
        // Fetch all consumers registered by the current user
        $list = $this->_store->listConsumers($this->_user->id);
        $this->view->list = $list;
    }


}



