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
    		'callbackUrl' => 'http://yiriji.com/oauth/index/callback',
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
    
    /**
     * Mock client callback page
     */
    public function callbackAction() {
        $this->_helper->JsonHelper->setNoView();
        
         // action body
        $config = array(
    		'callbackUrl' => 'http://yiriji.com/oauth/index/mock',
    		'siteUrl' => 'http://yiriji.com/oauth/index',
    		'consumerKey' => 'key',
    		'consumerSecret' => 'secret'
        );
        $consumer = new Zend_Oauth_Consumer($config);
        
        if (!empty($_GET) && isset($_SESSION['TWITTER_REQUEST_TOKEN'])) {
            $token = $consumer->getAccessToken($_GET,
                unserialize($_SESSION['TWITTER_REQUEST_TOKEN'])
            );
            $_SESSION['TWITTER_ACCESS_TOKEN'] = serialize($token);

            // Now that we have an Access Token, we can discard the Request Token
            $_SESSION['TWITTER_REQUEST_TOKEN'] = null;
        } else {
            // Mistaken request? Some malfeasant trying something?
            exit('Invalid callback request. Oops. Sorry.');
        }
    }
    
    /**
     * Mock client call API page
     */
    public function clientAction() {
        $this->_helper->JsonHelper->setNoView();
        
        $config = array(
    		'callbackUrl' => 'http://yiriji.com/oauth/index/mock',
    		'siteUrl' => 'http://yiriji.com/oauth/index',
    		'consumerKey' => 'key',
    		'consumerSecret' => 'secret'
        );
        
        $content = 'I\'m posting to Twitter using Zend_Oauth!';
        $title = 'title I\'m posting to Twitter using Zend_Oauth!';

        $token = unserialize($_SESSION['TWITTER_ACCESS_TOKEN']);
        $client = $token->getHttpClient($config);
        $client->setUri('http://yiriji.com/api/diarys');
        $client->setMethod(Zend_Http_Client::POST);
        $client->setParameterPost('content', $content);
        $client->setParameterPost('title', $title);
        $response = $client->request();

        $data = Zend_Json::decode($response->getBody());
        $result = $response->getBody();
        if (isset($data->text)) {
            $result = 'true';
        }
        echo $result;
    }

    /**
     * Request Token
     */
    public function requesttokenAction()
    {
        $this->_helper->JsonHelper->setNoView();
        
        $server = Ediary_OAuth_Server::getInstance();

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
    
    /**
     * Access Token
     */
    public function accesstokenAction()
    {
        $server = Ediary_OAuth_Server::getInstance();
        try {
            $req = OAuthRequest::from_request();
            $token = $server->fetch_access_token($req);
            print $token;
        } catch (OAuthException $e) {
            print($e->getMessage() . "\n<hr />\n");
            print_r($req);
            die();
        }
    }

}



