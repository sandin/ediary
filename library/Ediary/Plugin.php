<?php
interface Ediary_Plugin {
    
    /**
     * Init Plugin
     */
    public function _initPlugin();
    
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
    public function _initPages();
    /* {
       
     }
     */
    
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
    public function getInfo();
}