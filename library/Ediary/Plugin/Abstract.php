<?php
abstract class Ediary_Plugin_Abstract implements Ediary_Plugin_Interface
{
    /**
     * Construct
     * 必须是无参构造器
     */
    public function __construct() {}
    
    /**
     * Get Plugin information
     * 
     * @return array 
     *   <li> "name" => "Guest Plugin",	    // plugin name
     *   <li> "author" => "lds",		    // plugin author
     *   <li> "version" => "1.0.0",         // plugin version
     *   <li> "minVersion" => "1.0.0",      // ediary version
     *   <li> "requirePlugins" => array(),  // require some plugins
     *   <li> "requireModules" => array(),  // require some modules
     */
    public function getInfo() {
        return array(
            'name' => "",
            'author' => "",
            'version' => "",
            'minVersion' => "",
            'requirePlugins' => array(),
            'requireModules' => array()
        );
    }
    
    public function bootPlugin() {}
    
    public function initPlugin() {}
    
    /**
     * Register some pages
     * 
     * <code>
     * array(
     * 	  array(
     *     	'title' => 'plugin admin page',
     *      'callback' => 'adminPageCallback'
     *    ),
     * );
     * </code>
     * 
     * @return array list of pages
     */
    public function initPages() {}
    
    public function initBlocks() {}
    
    public function initThemes() {}
    
    public function initHooks() {}
    
}