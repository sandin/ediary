<?php
require_once("OAuth/OAuth.php");

class Oauth_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    /**
     * Mock client
     */
    public function indexAction()
    {
        // action body
        $config = array(
    		'callbackUrl' => 'http://yiriji.com/oauth/index/mock',
    		'siteUrl' => 'http://yiriji.com/oauth/index',
    		'consumerKey' => 'key',
    		'consumerSecret' => 'secret'
        );
        $consumer = new Zend_Oauth_Consumer($config);

        // fetch a request token
        $token = $consumer->getRequestToken();

        // persist the token to storage
        $_SESSION['TWITTER_REQUEST_TOKEN'] = serialize($token);

        var_dump($token);
        // redirect the server authorize page
        $consumer->redirect();
    }
    
    public function mockAction() {
        $this->_helper->JsonHelper->setNoView();
        var_dump($this->getRequest()->getParams());
    }

    /**
     * Request Token
     */
    public function requesttokenAction()
    {
        $this->_helper->JsonHelper->setNoView();
        
        $server = new Ediary_OAuth_Server(new Ediary_OAuth_Database());
        
        $rsa_method = new Ediary_OAuth_Signature_Method_RSA_SHA1();
        $hmac_method = new OAuthSignatureMethod_HMAC_SHA1();
        $plaintext_method = new OAuthSignatureMethod_PLAINTEXT();

        $server->add_signature_method($hmac_method);
        $server->add_signature_method($plaintext_method);
        $server->add_signature_method($rsa_method);

        $sig_methods = $server->get_signature_methods();

        // action body
        try {
            $req = OAuthRequest::from_request();
            $token = $server->fetch_request_token($req);
            echo $token;
        } catch (OAuthException $e) {
            echo 'OAuthException';
            echo $e->getMessage();
            echo $req->to_header();
            die();
        }
    }
    
    /**
     * Authorize 
     * 	oauth_token
     * 	oauth_callback
     * 
     * Login -> Redirect to confirm page
     */
    public function authorizeAction() {
        $url = urlencode("http://yiriji.com/oauth/index/confirm?" . http_build_query($_GET));
        $this->_forward('login', 'account', 'user', array('redirect' => $url));
    }

    /**
     * Confirm -> Redirect to client callback page
     */
    public function confirmAction() {
        $callback = $this->_getParam('oauth_callback');
        $token = $this->_getParam('oauth_token');
        
        // 重定向会client, 并通知该request token已被授权
        if ($this->getRequest()->isPost() && null != $callback && null != $token) {
            // TODO: 在数据库中标记该token为已授权
            $this->_redirect($callback . '?oauth_token=' . $token);
        }
    }

}



