<?php
class Ediary_Theme
{
   /**
     * @var Array list of themes
     */
    private static $_themes = array();
    
    private static $_instance = null;
    
    private function __construct() {
    }
    
    /**
     * @return Ediary_Theme
     */
    public function getInstance() {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    private function __clone() {}
    
    /**
     * Theme
     * 
     * @param String $namespace module name
     * @param String $name block name
     * @param Array $params callback params
     * @return String response content 
     */
    public static function theme($namespace, $name, $params = array()) {
        if (! is_array($params)) {
            throw new Ediary_Block_Exception(__CLASS__ . 'expects parameter 2 to be array');
        }
        $name = self::addPrefix($namespace, $name);
        if ( isset(self::$_themes[$name]) ) {
            $template = self::$_themes[$name]; 
            
            $view = new Zend_View();
            $view->setScriptPath(dirname($template));
            $view->assign($params);
            $html = $view->render(basename($template));
            
            $view = null;
            return $html;
        }
    }
    
    /**
     * Add them
     * 
     * @param String $namespace module name
     * @param String $name theme name
     * @param String $template file of template (absolute path)
     */
    public static function register($namespace, $name, $template) {
        $name = self::addPrefix($namespace, $name);
        self::$_themes[$name] = $template;
    }
    
    public static function addPrefix($namespace, $name) {
        return $namespace . '_' . $name;
    }
    
}