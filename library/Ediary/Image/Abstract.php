<?php
/**
 * abstract
 * 
 * @author lds
 *
 */
class Ediary_Image_Abstract
{
    const PLACEHOLDER = '{$1}';
    const DEFAULT_PATTERN = '{$1}_thumbnail';
    
    public function __construct() {}
    
    /**
     * 
     * 利用暂位符模式重命名文件名
     * 
     * INPUT: 
     * $originFileName : '/your/path/originname.jpg'
     * $pattern pattern|output : '{$1}_thumbnail'  | 'output.jpg
     * 
     * OUTPUT:
     * '/your/path/originname_thumbnail.jpg'
     * 
     * @param String $originFileName
     * @param String $pattern
     * @return string
     */
    public static function rename($originFileName, $pattern) {
        if ( strpos($pattern, self::PLACEHOLDER) !== false ) { 
            $fileInfo = pathinfo($originFileName);
            $filename = str_replace(self::PLACEHOLDER, $fileInfo['filename'], $pattern);
            $dirname = ($fileInfo['dirname'] !== '.') ? $fileInfo['dirname']  . DIRECTORY_SEPARATOR : '';
            return $dirname . $filename . '.' . $fileInfo['extension'];
        } else {
            return $pattern; // 无替换模式
        }
    }
}