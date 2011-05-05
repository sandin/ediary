<?php

class Ediary_Core
{
    const UNAUTHORIZED = 401;

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
    
    public static function exitWithCode($code = 404) {
        switch ($code) {
            case self::UNAUTHORIZED:
                header('HTTP/1.1 401 Unauthorized');
                header('Content-Type: text/plain; charset=utf8');
                exit("Unauthorized");
                break;
            case 404:
            default: 
                break;
        }
        exit();
    }

    public static function gotoUrl($url) {
        //TODO: add application base url
        header("location: " . $url);
        exit();
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