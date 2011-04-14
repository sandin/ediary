<?php
class Ediary_Auth 
{
    const KEY = 'user';
    private static $_isLogined = false;
    
    public static function getIndentity() {
        $auth = Zend_Auth::getInstance();
        $storage = new Zend_Auth_Storage_Session(Ediary_Application::SESSION_AUTH);
        $auth->setStorage($storage);
        
        $user = $auth->getIdentity();
        self::$_isLogined = (null != $user);
        return $user;
    }
    
    /** @deprecated */
    public static function getUser() {
        if (Zend_Registry::isRegistered(self::KEY)) {
            return Zend_Registry::get(self::KEY);
        }
    }
    
    public static function registerUser() {
        Zend_Registry::set(self::KEY, $user);
    }
    
    /**
     * Checks if a user is logged in,
     * if not redirects them to the login page
     * 
     * @return boolean true on is Logined 
     */
    public static function authRedirect() {
        if (! self::$_isLogined) {
            Ediary_Core::gotoUrl(Ediary_Core::baseUrl('/login'));
        }
        return true;
    }
    
    /**
     * Checks if a user is admin, if not exit application
     */
    public static function adminRedirect() {
        self::authRedirect();
        
        $user = self::getUser();
        if (null === $user || !Ediary_UserGroup::isAdmin($user->id)) {
            Ediary_Core::exitApp("没有权限访问该页面");
        }
    }
    
    public static function checkAccessPermission($group) {
        $user = self::getUser();
        if (self::isSuperUser($user)) {
            return; // super user is God, no need to check
        }
        
        if (null != $user) {
            $allowGroups = is_array($group) ? $group : explode(',', $group);
            $userGroups = Ediary_UserGroup::getUserGroups($user->id, false);
            $userGroups = array();
            foreach ($userGroups as $group) {
                if (in_array($group, $allowGroups)) {
                    return true;
                }
            }
        }
        return Ediary_Core::exitApp("没有权限访问该页面");
    }
    
    /**
     * Whether the user is super user
     * 
     * @param Ediary_User|stdClass $user 只要有$user->email
     * @return boolean
     */
    public static function isSuperUser($user = null) {
        if (null !== $user && isset($user->email) 
                && $user->email === 'lds2012@gmail.com')
        {
            return true;
        }
        return false;
    }
    
    public static function isLogined() {
        return self::$_isLogined;
    }
}