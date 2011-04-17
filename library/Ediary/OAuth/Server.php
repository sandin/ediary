<?php
require_once('OAuth/OAuth.php');

class Ediary_OAuth_Server extends OAuthServer {
    public function get_signature_methods() {
        return $this->signature_methods;
    }

    public static function getInstance() {
        $server = new Ediary_OAuth_Server(new Ediary_OAuth_Database());

        $rsa_method = new Ediary_OAuth_Signature_Method_RSA_SHA1();
        $hmac_method = new OAuthSignatureMethod_HMAC_SHA1();
        $plaintext_method = new OAuthSignatureMethod_PLAINTEXT();

        $server->add_signature_method($hmac_method);
        $server->add_signature_method($plaintext_method);
        $server->add_signature_method($rsa_method);
        
        return $server;
    }
}