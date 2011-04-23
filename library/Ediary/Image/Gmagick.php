<?php
/**
 * 
 * Requried: Gmagick
 * @author lds
 *
 */
class Ediary_Image_Gmagick extends Ediary_Image_Abstract implements Ediary_Image_Interface
{
    /**
     * @var Ediary_Logger
     */
    private $logger;
    
    public function __construct() {
        if (! self::isSupported()) {
            throw new Ediary_Exception(__CLASS__ . " need gmagick extension");
        }
        $this->logger = Ediary_Logger::getInstance();
        parent::__construct();
    }
    
    public static function isSupported() {
        return ( extension_loaded('gmagick') );
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
    public function thumbnail($input, $width, $height, $output) {
        $this->logger->log("Create thumbnail by Gmagick " . $input . " -> " . $output );
        
        $image = new Gmagick($input);
        $image->thumbnailImage($width, $height);
        
        $output = self::rename($input, $output);
        $image->write($output);
        return $output;
    }
}
