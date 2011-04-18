<?php

class Oauth_IndexController extends Zend_Controller_Action
{
    private $_key = '3c2d81228736786e5e846fa51900067404daaaa25';
    private $_secret = 'f6996b1591ef009dcea225629a77abf4';
 
    public function init()
    {
        /* Initialize action controller here */
        $db = Ediary_Db::getInstance();
        $this->_store = OAuthStore::instance('PDO',
                                array('conn' => $db->getAdapter()->getConnection()));
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
    		'consumerKey' => $this->_key,
    		'consumerSecret' => $this->_secret,
        	'signatureMethod' => "Plaintext"
        );
        $consumer = new Zend_Oauth_Consumer($config);

        // fetch a request token
        $token = $consumer->getRequestToken();

        // persist the token to storage
        $_SESSION['TWITTER_REQUEST_TOKEN'] = serialize($token);

        // redirect the server authorize page
        if (! empty($token)) {
            $consumer->redirect();
        } else {
            echo '服务器没有返回 request token';
        }
    }
    
    /**
     * Mock client callback page
     */
    public function callbackAction() {
        $this->_helper->JsonHelper->setNoView();
        
         // action body
        $config = array(
    		'callbackUrl' => 'http://yiriji.com/oauth/index/callback',
    		'siteUrl' => 'http://yiriji.com/oauth/index',
    		'consumerKey' => $this->_key,
    		'consumerSecret' => $this->_secret,
        	'signatureMethod' => "Plaintext"
        );
        $consumer = new Zend_Oauth_Consumer($config);
        
        if (!empty($_GET) && isset($_SESSION['TWITTER_REQUEST_TOKEN'])) {
            $token = $consumer->getAccessToken($_GET,
                unserialize($_SESSION['TWITTER_REQUEST_TOKEN'])
            );
            $_SESSION['TWITTER_ACCESS_TOKEN'] = serialize($token);
            var_dump($token);

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
    		'callbackUrl' => 'http://yiriji.com/oauth/index/callback',
    		'siteUrl' => 'http://yiriji.com/oauth/index',
    		'consumerKey' => $this->_key,
    		'consumerSecret' => $this->_secret,
        	'signatureMethod' => "Plaintext"
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
     * get Request Token
     */
    public function requesttokenAction()
    {
        $this->_helper->JsonHelper->setNoView();
        
        $store  = OAuthStore::instance();
        $server = new OAuthServer();
        $token = $server->requestToken();
        echo $token;
        exit();
    }
    
    /**
     * Authorize 
     * 	oauth_token
     * 	oauth_callback
     * 
     * Login -> Redirect to confirm page
     */
    public function authorizeAction() {
        // 确保用户已登录
        Ediary_Auth::authRedirect('/oauth/index/authorize?' . http_build_query($_GET)); // 登录完后回来
        $this->_user = Ediary_Auth::getUser();

        // Fetch the oauth store and the oauth server.
        $store  = OAuthStore::instance();
        $server = new OAuthServer();
        
        try
        {
            // Check if there is a valid request token in the current request
            // Returns an array with the consumer key, consumer secret, token, token secret and token type.
            $rs = $server->authorizeVerify();

            if ($_SERVER['REQUEST_METHOD'] == 'POST')
            {
                // See if the user clicked the 'allow' submit button (or whatever you choose)
                $authorized = array_key_exists('allow', $_POST);

                // Set the request token to be authorized or not authorized
                // When there was a oauth_callback then this will redirect to the consumer
                $server->authorizeFinish($authorized, $this->_user->id);

                // No oauth_callback, show the user the result of the authorization
                $this->view->isOOB = true;
                $this->view->token = $rs['token'];
                $this->view->verifier = self::getAuthVerifier($rs['token']); // 认证一次换一个, 即时是同一个token
            }
        }
        catch (OAuthException $e)
        {
            // No token to be verified in the request, show a page where the user can enter the token to be verified
            echo $e->getMessage();
        }
    }
    
    private static function getAuthVerifier($token_id) {
        $db = Ediary_Db::getInstance();
        return $db->fetchOne("SELECT ost_verifier FROM oauth_server_token WHERE ost_token =? ", $token_id);
    }

    /**
     * Access Token
     */
    public function accesstokenAction()
    {
        $store  = OAuthStore::instance();
        $server = new OAuthServer();
        $server->accessToken();
    }

}



