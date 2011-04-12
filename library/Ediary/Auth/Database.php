<?php
class Ediary_Auth_Database 
{
    
    public static function authenticate($email, $password, $rememberMe = false) {
        $result = new stdClass();
        $result->result  = false;
        $result->message = '';
        $result->user = null;
        
        $db = Ediary_Db::getInstance();
        
        $storage = new Zend_Auth_Storage_Session(Ediary_Application::SESSION_AUTH);
        $namespace = $storage->getNamespace();
        //$storage->setExpirationHops(5);
        //$storage->setExpirationSeconds(3);
        
        $auth = Zend_Auth::getInstance();
        $auth->setStorage($storage);
        
        $authAdapter = new Zend_Auth_Adapter_DbTable($db->getConnection());
        $authAdapter->setTableName($db->users)
                    ->setIdentityColumn('email')
                    ->setCredentialColumn('password')
                    ->setIdentity($email)
                    ->setCredential($password);

        // 执行认证查询，并保存结果
        $result = $auth->authenticate($authAdapter);
      
        if (!$result->isValid()) {
            // Authentication failed; print the reasons why
            $result->result =  false;
            $result->message = $result->getMessages() ;
        } else {
            // Authentication Success
            $storage = $auth->getStorage();
            $user_email = $result->getIdentity();
            $user = Ediary_User::find($user_email);
            $storage->write($user->toArray());

            // rememberMe
            if ($rememberMe) {
                setcookie('ue', $user_email, time() + 2592000, '/', false);
                Zend_Session::rememberMe(2592000);
            }
            $result->result = true;
            $result->user = $user;
        }
        
        return $result;
    }
    
    public static function logout() {
        $user = Zend_Auth::getInstance()->getIdentity();
        if (isset($user)) {
            $email = $user->email;
            if (isset($email)) {
                setcookie('ue', $email, -1, '/', false);
                Zend_Auth::getInstance()->clearIdentity();
                Zend_Session::forgetMe();
            }
        }
    }
}