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

    public static function gotoUrl($url) {
        //TODO: add application base url
        header("location: " . $url);
    }
    
    public static function redirect($message, $title, $url) {
        return 'redirect/?goto=' . urlencode($url) 
               . '&msg=' . urlencode($message)
               . '&title=' . urlencode($title);
        
    }

}