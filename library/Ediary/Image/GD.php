<?php
class Ediary_Image_GD extends Ediary_Image_Abstract implements Ediary_Image_Interface
{
    /**
     * @var Ediary_Logger
     */
    private $logger;
    
    public function __construct() {
        if (! self::isSupported()) {
            throw new Ediary_Exception(__CLASS__ . " need GD extension and PNG/GIF/JPG/WBMP support.");
        }
        $this->logger = Ediary_Logger::getInstance();
        parent::__construct();
    }
    
    public static function isSupported() {
        return  (extension_loaded('GD') && 
            imagetypes() & IMG_PNG   &&
            imagetypes() & IMG_GIF   &&
            imagetypes() & IMG_JPG   &&
            imagetypes() & IMG_WBMP);
    }
        
    /**
     * Create Image 
     * 
     * @param int $type image type IMAGETYPE_XXX 
     * @throws Ediary_Image_Exception not supprot image type
     * @return resource an image resource identifier on success, false on errors.  
     */
    private static function createImage($filename, $type) {
        $image = null;
        switch($type) {
            case IMAGETYPE_GIF:
                $image = imagecreatefromgif($filename);
                break;
            case IMAGETYPE_JPEG:
                $image = imagecreatefromjpeg($filename);
                break;
            case IMAGETYPE_PNG:
                $image = imagecreatefrompng($filename);
                break;
            case IMAGETYPE_BMP:
                $image = imagecreatefromwbmp($filename);
                break;
            default:
                throw new Ediary_Image_Exception(__CLASS__ . " not support " 
                    . image_type_to_mime_type($this->_type));
        }
        return $image;
    }
    
      
    /**
     * Write Image into file
     * 
     * @param $image resource an image resource identifier
     * @param $filename output filename
     * @return bool Returns true on success or false on failure.  
     */
    private static function writeImage($image, $type, $output) {
        $result = false;
        switch($type) {
            case IMAGETYPE_GIF:
                $result = imagegif($image, $output);
                break;
            case IMAGETYPE_JPEG:
                $result = imagejpeg($image, $output);
                break;
            case IMAGETYPE_PNG:
                $result = imagepng($image, $output, 9);
                break;
            case IMAGETYPE_BMP:
                $result = imagewbmp($image, $output);
                break;
            default:
                break;
        }
        return $result;
    }
    
 	/**
     * Create a thumbnail and write it into a output file
     * 
     * @param int $width
     * @param int $height
     * @param String $output output file name(path)
     * 		  如果提供 '${1}_thumbnail' 类似的值则表示将输出文件保存在原文件目录, 只是变换文件名. 
     * 		  ${1} 为原文件名(不含扩展名)的暂位符, 输出文件将只修改文件名, 保留扩展名和目录部分.
     * 
     * @return output filename(path), FALSE on fail.
     */
    public function thumbnail($input, $maxWidth, $maxHeight, $output) {
            
        list($width, $height, $type, $attr) = getimagesize($input);
        $image = self::createImage($input, $type);
        
        $scale = min($maxWidth/$width, $maxHeight/$height);
        $newWidth = intval($scale * $width); 
        $newHeight = intval($scale * $height);
        
        $imageResized = imagecreatetruecolor($newWidth, $newHeight); // 手册说不支持GIF, 但PHP 5.3环境下测试可以
        //$imageResized = imagecreate($newWidth, $newHeight);
        imagecopyresampled($imageResized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        $output = self::rename($input, $output);
        $result = self::writeImage($imageResized, $type, $output);
        
        if ($result) {
            $this->logger->log("Create thumbnail by GD " . $input . " -> " . $output );
            return $output;
        } else {
            $this->logger->log("Fail create thumbnail with GD " . $input . " -> " . $output );
            return false;
        }
    }
}