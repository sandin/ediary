<?php
/**
 * Guest试用插件
 * TODO: 目前部分内容还遗留在 user/GuestController
 * 
 * @author lds
 */
class Plugins_Guest_Plugin extends Ediary_Plugin_Abstract
{
    /** @var Zend_Log */
    private static $logger;
    
    private $_guest = array(
    			"email" => "guest@eriji.com",
            	"password" => "guest",
            	"username" => "guest");
    
    public function getInfo() {
        return array(
        	"name" => "Guest Plugin",
            "author" => "lds",
            "version" => "1.0.0",         // plugin version
            "minVersion" => "1.0.0",      // ediary version
            "requirePlugins" => array(),
            "requireModules" => array(),
        );
    }
    
    public function __construct() {
        self::$logger = Ediary_Logger::getLogger();
        $this->initPlugin(); // TODO: delete me
    }
    
    public function initPlugin() {
        $this->initHooks();
        $this->initThemes();
    }
    
    public function initPages() {
        $pages = array(
            array(
            	'title' => 'admin',
                'callback' => 'adminPage'
            ),
        );
        return $pages;
    }
    
    public function adminPage() {
        //DEBUG
        //$this->createGuest();
        //$this->dumpGuest();
        
        $content = Ediary_theme::theme(__CLASS__, "admin");
        return $content;
    }
    
    public function initThemes() {
        $template =  realpath(dirname(__FILE__)) . "/views/admin/index.phtml";
        Ediary_Theme::register(__CLASS__, "admin", $template);
    }
    
    public function initHooks() {
        Ediary_Hooks::setDebug(true);
        Ediary_Hooks::register("onUserLogin", array($this, "hook_onUserLogin"));
        Ediary_Hooks::register("onUserLogout", array($this, "hook_onUserLogout"));
    }
    
    public function hook_onUserLogin($user = null) {
        if (null != $user && isset($user->email) 
            && $user->email === $this->_guest["email"]) {
            $this->dumpGuest();
        }
    }
    
    public function hook_onUserLogout($user = null) {
        if (null != $user && isset($user->email) 
            && $user->email === $this->_guest["email"]) {
            $this->dumpGuest();
        }
    }
    
    /**
     * 创建游客帐号
     * 
     * @return Ediary_User
     */
    public function createGuest() {
        $guest = $this->_guest;
        if (! Ediary_User::isExists($guest['email'])) {
            $user = Ediary_User::create($guest);
            self::$logger->info("Create Guest");
            return $user;
        }
    }
    
    /**
     * 清空游客
     */
    public function dumpGuest() {
        $user = Ediary_User::find($this->_guest["email"]);
        if (null != $user) {
            // 清空该用户所有额外数据
            $meta = new Ediary_Metadata_User($user->id);
            $meta->delete(); // delete all
            
            // 清空该用户所有日记
            Ediary_Diary::deleteAllByUserId($user->id);
            
            // 删除该用户
            //$user->delete();
            $user->setPassword($this->_guest['password']);
            self::$logger->info("Dump Guest");
        }
    }
    
}
