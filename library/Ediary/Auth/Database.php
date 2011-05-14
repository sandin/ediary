<?php
class Ediary_Auth_Database 
{
    private static $auth = null;
    
    /**
     * Zend_Auth#authenticate()
     * 
     * @param String $email
     * @param String $password
     * @param String $rememberMe
     * @return stdClass(result, message, user)
     */
    public static function authenticate($email, $password, $rememberMe = false) {
        $result = new stdClass();
        $result->result  = false;
        $result->message = '';
        $result->user = null;
        
        $db = Ediary_Db::getInstance();
        
        $storage = new Zend_Auth_Storage_Session(Ediary_Auth::KEY_SESSION_AUTH);
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
        
        /** @deprecated
        $storage = new Zend_Auth_Storage_Session(Ediary_Application::SESSION_AUTH);
        $result = self::simpleAuth($email, $password, $storage);
        */
        
        if (!$result->isValid()) {
            // Authentication failed; print the reasons why
            $result->result =  false;
            $result->message = $result->getMessages() ;
        } else {
            // Authentication Success
            
            $loginedUser =  $authAdapter->getResultRowObject(
                array(
                    'id',
                	'email',
                    'username',
                    'last_logined',
                    'account',
                    'theme',
                    'photo'
            ));
            
            // Store into SESSION
            $storage = $auth->getStorage();
            $storage->write($loginedUser);

            // rememberMe
            if ($rememberMe) {
                setcookie('ue', $loginedUser->email, time() + 2592000, '/', false);
                Zend_Session::rememberMe(2592000);
                Zend_Session::getSaveHandler()->setLifetime(2592000);
            }
            
            $result->result = true;
            $result->user = $loginedUser;
        }
        
        return $result;
    }
    
    /**
     * Clear Indentity and forget me
     */
    public static function logout() {
        $user = Zend_Auth::getInstance()->getIdentity();
        if (isset($user) && isset($user->email)) {
            setcookie('ue', "", time()-3600, '/', false);
            Zend_Auth::getInstance()->clearIdentity();
            Zend_Session::forgetMe();
        }
    }
}