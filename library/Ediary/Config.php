<?php

/**
 */
class Ediary_Config
{
    private static $_useCache = false;
    private static $_cacheEnable = true;
    
    public static function getCacheFile() {
        return APPLICATION_PATH . '/data/cache/application.ini.inc';
    }
    
    public static function getAppConfig($configFile) {
        $cacheConfig = self::getCacheFile();
        if ( false != is_file($cacheConfig) ) {
            self::$_useCache = true;
            return $cacheConfig; // cache hint
        }
        return $configFile;
    }
    
    public static function cacheConfig($config) {
        if ( self::$_cacheEnable && !self::$_useCache ) {
            self::cacheToFile($config, self::getCacheFile());
        }
    }
    
    public static function cacheToFile($cache, $file) {
        $content = '<?php' . PHP_EOL
             . 'return '
             . var_export($cache, true) . PHP_EOL
             . '?>';
        file_put_contents($file, $content); 
    }
    
    public static function dumpCache() {
        unlink(self::getCacheFile());
    }
}