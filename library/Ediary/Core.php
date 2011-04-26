<?php

class Ediary_Core
{

    /**
     * 非正常原因退出程序
     *
     * @param String $msg 结束原因
     */
    public static function exitApp($msg = '') {
        self::gotoUrl('/error/' . urlencode($msg));
    }
    
    public static function notFound() {
        self::gotoUrl('/error/notfound/?code=404');
    }

    public static function gotoUrl($url) {
        //TODO: add application base url
        header("location: " . $url);
    }
    
    public static function redirect($message, $title, $url) {
        return 'redirect/?goto=' . urlencode($url) 
               . '&msg=' . urlencode($message)
               . '&title=' . urlencode($title);
        
    }
    
    public static function baseUrl($url) {
        $view = Zend_Layout::getMvcInstance()->getView();
        if (null != $view) {
            return $view->baseUrl($url);
        }
    }
    
    /**
     * Get module absolute path, not end with '/'
     * 
     * @param String $module module name, 空为当前模块
     * @return String path
     */
    public static function getModulePath($module = null) {
        $front = Zend_Controller_Front::getInstance(); 
        if (null == $module) {
            $module = $front->getRequest()->getModuleName();
        }
        return $front->getModuleDirectory($module);
    }

}