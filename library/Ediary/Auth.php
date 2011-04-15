<?php
class Ediary_Auth 
{
    const KEY = 'user';
    
    /**
     * Get Indentity from the auth strorage
     * 
     * @return stdClass
     */
    public static function getIndentity() {
        $auth = Zend_Auth::getInstance();
        $storage = new Zend_Auth_Storage_Session(Ediary_Application::SESSION_AUTH);
        $auth->setStorage($storage);
        
        $user = $auth->getIdentity();
        return $user;
    }
    
    /** 
     * Get user data in the session
     * 
     * @return stdClass
     */
    public static function getUser() {
        if (Zend_Registry::isRegistered(self::KEY)) {
            return Zend_Registry::get(self::KEY);
        }
    }
    
    /**
     * Put user data into the session
     */
    public static function registerUser($user) {
        Zend_Registry::set(self::KEY, $user);
    }
    
    /**
     * Checks if a user is logged in,
     * if not redirects them to the login page
     * 
     * @return boolean true on is Logined 
     */
    public static function authRedirect() {
        if (! self::isLogined()) {
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
    
    /**
     * Check authed user's access permission
     * if cann't access current page, application will exit.
     * 
     * @param string|array $group
     * @return void|boolean 
     */
    public static function checkAccessPermission($group) {
        $user = self::getUser();
        if (self::isSuperUser($user)) {
            return true; // super user is God, no need to check
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
        return (null != self::getUser());
    }
}