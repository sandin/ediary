<?php
class Ediary_Cache {
    
    /**
     * @return Zend_Cache
     */
    public static function getCache() {
        $front = Zend_Controller_Front::getInstance();
        $bootstrap = $front->getParam('bootstrap');
        $manager = $bootstrap->getPluginResource('cachemanager')
                        ->getCacheManager();
        return $manager->getCache('database');
    }
    
}