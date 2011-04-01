<?php
/**
 * Enter description here ...
 * 
 * Requried: Gmagick
 * 
 * @author lds
 *
 */
class Ediary_Image
{
    const PLACEHOLDER = '{$1}';
    
    private $_filename;
    private $_image;
    
    public function __construct($filename) {
        if (! extension_loaded('gmagick')) {
            throw new Ediary_Exception(__CLASS__ . " need gmgick extension.");
        }
        if (! file_exists($filename)) {
            throw new Ediary_Exception($filename . ' is not exists.');
        }
        
        $this->_filename = $filename;
        $this->_image = new Gmagick($this->_filename);
    }

    /**
     * Create a thumbnail and write it into a output file
     * 
     * @param int $width
     * @param int $height 如果为0, 则表示保持比例自动缩放
     * @param String $output output file name(path)
     * 		  如果提供 '${1}_thumbnail' 类似的值则表示将输出文件保存在原文件目录, 只是变换文件名. 
     * 		  ${1} 为原文件名(不含扩展名)的暂位符, 输出文件将只修改文件名, 保留扩展名和目录部分.
     * 
     * @return output filename(path)
     * @throws GmagickException: Unable to open file 
     */
    public function thumbnail($width, $height, $output) {
        $image = $this->_image;
        $image->thumbnailImage($width, $height);
        
        if ( strpos($output, self::PLACEHOLDER) !== false ) { 
            $output = self::parseFileName($this->_filename, $output);
        }
        $image->write($output);
        return $output;
    }
    
   
    /**
     * 'originname.jpg' with pattern '{$1}_thumbnail' 
     *  => 'originname_thumbnail.jpg'
     * 
     * @param String $originFileName
     * @param String $pattern
     * @return string
     */
    public static function parseFileName($originFileName, $pattern) {
        $fileInfo = pathinfo($originFileName);
        $filename = str_replace(self::PLACEHOLDER, $fileInfo['filename'], $pattern);
        return $fileInfo['dirname'] . DIRECTORY_SEPARATOR 
               . $filename . '.' . $fileInfo['extension'];
    }
    
    public function __call($method, $args) {
        if (method_exists($this->_image, $method)) {
            return call_user_func_array(array($this->_image, $method), $args);
        } else {
            throw new Ediary_Exception('Call Unknown Method : ' . __CLASS__ . '#' . $method );
        }
    }
}