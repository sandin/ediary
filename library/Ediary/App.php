<?php
class Ediary_App
{
    const INSTALLING = 'installing';
    
    public static function isInstalled() {
        return file_exists(APPLICATION_PATH . '/configs/installed.txt');
    }
    
    public static function setIsInstalled() {
        file_put_contents(APPLICATION_PATH . '/configs/installed.txt',
            'Application installed on ' . date(DATE_RFC1036, time()));
    }
    
    public static function isInstalling() {
        return (isset($_SESSION) && isset($_SESSION[self::INSTALLING]) 
                && $_SESSION[self::INSTALLING]);
    }
    
    /**
     * @param boolean $installing
     */
    public static function setInstalling($installing) {
        if ($installing) {
            $_SESSION[self::INSTALLING] = $installing;
        } else {
            unset($_SESSION[self::INSTALLING]);
        }
    }
}