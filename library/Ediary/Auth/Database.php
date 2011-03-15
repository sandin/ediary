<?php
class Ediary_Auth_Database 
{
    
    public static function authenticate($email, $password) {
        $result = new stdClass();
        $result->result  = false;
        $result->message = '';
        
        $db = Ediary_Database_Db::getInstance();
        
        $storage = new Zend_Auth_Storage_Session(Ediary_Application::SESSION_AUTH);
        $namespace = $storage->getNamespace();
        //$storage->setExpirationHops(5);
        //$storage->setExpirationSeconds(3);
        
        $auth = Zend_Auth::getInstance();
        $auth->setStorage($storage);
        
        $authAdapter = new Zend_Auth_Adapter_DbTable($db->getConnection());
        $authAdapter->setTableName($db->users)
                    ->setIdentityColumn(Ediary_User::EMAIL)
                    ->setCredentialColumn(Ediary_User::PASSWORD)
                    ->setIdentity($email)
                    ->setCredential($password);

        // 执行认证查询，并保存结果
        $result = $auth->authenticate($authAdapter);
      
        if (!$result->isValid()) {
            // Authentication failed; print the reasons why
            $result->result =  false;
            $result->message = $result->getMessages() ;
        } else {

            $storage = $auth->getStorage();
            $storage->write(
                $authAdapter->getResultRowObject(array(
                    Ediary_User::EMAIL,
                    Ediary_User::NAME,
                    Ediary_User::ID)
            ));

            // set a cookie to save user info
            $user_email = $result->getIdentity();
            setcookie('ue', $user_email, time() + 2592000, '/', false);
            //TODO: remeberMe
            Zend_Session::rememberMe(2592000);
            $result->result = true;
        }
        
        return $result;
    }
}