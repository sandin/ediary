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
    private $_filename;
    private $_image;
    
    public function __construct($filename) {
        if (! extension_loaded('gmagick')) {
            throw new Ediary_Exception(__CLASS__ . " need gmgick extension.");
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
     * @throws GmagickException: Unable to open file 
     */
    public function thumbnail($width, $height, $output) {
        $image = $this->_image;
        $image->thumbnailImage($width, $height);
        $image->write($output);
    }
    
    public function __call($method, $args) {
        if (method_exists($this->_image, $method)) {
            return call_user_func_array(array($this->_image, $method), $args);
        } else {
            throw new Ediary_Exception('Call Unknown Method : ' . __CLASS__ . '#' . $method );
        }
    }
}