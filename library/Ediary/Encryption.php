<?php
class Ediary_Encryption
{
    const TYPE_MCRYPT = 1; 
    
    private static $key = "private key";
    
    private static function _init() {
        
    }
    
    public static function encrypt($key, $text) {
        $iv = self::getIv();
        $key = self::getKey($key);
        $crypttext = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $text, MCRYPT_MODE_ECB, $iv);
        return $crypttext;
        //return bin2hex($crypttext);
    }
    
    public static function decrypt($key, $text) {
        $iv = self::getIv();
        //$text = pack("H*", $text);
        $key = self::getKey($key);
        $d = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $text, MCRYPT_MODE_ECB, $iv);
        return trim($d);
    }
    
    private static function getIv() {
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        return $iv;
    }
    
    private static function getKey($key) {
        return md5(self::$key . $key);
    }
    
}