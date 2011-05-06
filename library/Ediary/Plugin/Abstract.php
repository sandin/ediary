<?php
/**
 * Plugin Abstract 
 * 所有插件必须继承该抽象类
 * 
 * 插件基本信息使用 const 进行定义, 标准格式为:
 * 
 *  const NAME = "Guest Plugin";		// 插件名称
 *  const AUTHOR = "lds";				// 插件作者
 *  const VERSION = "1.0";	   			// 插件版本
 *  const MIX_VERSION = "1.0"; 			// 应用程序最低版本
 *  const DESCRIPTION = 'Description;	// 插件简介
 *  const REQUIRE_PlUGINS = '';			// 依赖其他插件列表(逗号分隔)
 *  const REQUIRE_MODULES = '';			// 依赖某些模块列表(逗号分隔)
 *  
 * 如果某插件被激活, 那么每次应用程序启动的时候都会调用该插件的 bootPlugin() 方法
 * 
 * @author lds
 *
 */
abstract class Ediary_Plugin_Abstract implements Ediary_Plugin_Interface
{
    public static $defaultInfo = array(
		'NAME'         => 'Plugin Name',
		'PLUGIN_URI'   => 'Plugin URI',
		'VERSION'      => 'Plugin Version',
		'MIN_VERSION'  => 'App min Version',
		'DESCRIPTION'  => 'Description',
		'AUTHOR'       => 'Author',
        'REQUIRE_PlUGINS' => '',
        'REQUIRE_MODULES' => '',
	);
	
    /**
     * Construct
     * 必须是无参构造器
     */
    public function __construct() {}
    
    public function bootPlugin() {}
    
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