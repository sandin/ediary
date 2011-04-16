<?php
require_once("OAuth/OAuth.php");

class Oauth_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
        $config = array(
    		'callbackUrl' => 'http://example.com/callback.php',
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
        // redirect the user
        //$consumer->redirect();
    }

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
    
    public function authorizeAction() {
        
    }


}



