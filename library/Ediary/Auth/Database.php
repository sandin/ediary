<?php
class Ediary_Auth_Database 
{
    private static $auth = null;
    
    /**
     * Just Auth
     * 
     * @param String $email
     * @param String $password
     * @param  $storage
     * @return Zend_Auth_Result
     */
    public static function simpleAuth($email, $password, $storage = null) {
        $db = Ediary_Db::getInstance();
        $auth = self::$auth =  Zend_Auth::getInstance();
        
        if (isset($storage)) {
            $auth->setStorage($storage);
        }
        
        $authAdapter = new Zend_Auth_Adapter_DbTable($db->getAdapter());
        $authAdapter->setTableName($db->users)
                    ->setIdentityColumn('email')
                    ->setCredentialColumn('password')
                    ->setIdentity($email)
                    ->setCredential($password);
        return $auth->authenticate($authAdapter);
    }
    
    public static function authenticate($email, $password, $rememberMe = false) {
        $result = new stdClass();
        $result->result  = false;
        $result->message = '';
        $result->user = null;
        
        /*
        $db = Ediary_Db::getInstance();
        
        $storage = new Zend_Auth_Storage_Session(Ediary_Application::SESSION_AUTH);
        $namespace = $storage->getNamespace();
        //$storage->setExpirationHops(5);
        //$storage->setExpirationSeconds(3);
        
        $auth = Zend_Auth::getInstance();
        $auth->setStorage($storage);
        
        $authAdapter = new Zend_Auth_Adapter_DbTable($db->getAdapter());
        $authAdapter->setTableName($db->users)
                    ->setIdentityColumn('email')
                    ->setCredentialColumn('password')
                    ->setIdentity($email)
                    ->setCredential($password);

        // 执行认证查询，并保存结果
        $result = $auth->authenticate($authAdapter);
        */
        
        $storage = new Zend_Auth_Storage_Session(Ediary_Application::SESSION_AUTH);
        $result = self::simpleAuth($email, $password, $storage);
        
        if (!$result->isValid()) {
            // Authentication failed; print the reasons why
            $result->result =  false;
            $result->message = $result->getMessages() ;
        } else {
            // Authentication Success
            $user = Ediary_User::find($email);
            
            // Store into SESSION
            $storage = self::$auth->getStorage();
            $storage->write((object) $user->toArray());

            // rememberMe
            if ($rememberMe) {
                setcookie('ue', $user->email, time() + 2592000, '/', false);
                Zend_Session::rememberMe(2592000);
            }
            $result->result = true;
            $result->user = $user;
        }
        
        return $result;
    }
    
    public static function logout() {
        $user = Zend_Auth::getInstance()->getIdentity();
        if (isset($user) && isset($user->email)) {
            setcookie('ue', $user->email, -1, '/', false);
            Zend_Auth::getInstance()->clearIdentity();
            Zend_Session::forgetMe();
        }
    }
}