<?php
/**
 * 上传文件 - 图片类
 * 
 * Require extensions:  fileInfo or magicMime
 * @author lds
 *
 */
class Ediary_Upload_Images extends Ediary_Upload
{
    private static $allowExtension = array('jpg', 'png', 'gif');
    private static $allowMimeType = array('image/jpeg', 'image/png', 'image/gif');
    private static $maxSize = 5000000; // bytes
    private static $maxCount = 5;  // number of files
    
    public function __construct($pathname) {
        parent::__construct($pathname);
        $this->setValidators();
    }
    
    private function setValidators() {
        $upload = $this->_fileTrasfer;
        $upload->addValidator('Size', false, self::$maxSize)
               ->addValidator('FilesSize', false, self::$maxCount * self::$maxSize)
               ->addValidator('Extension', false, self::$allowExtension);
        if (class_exists('finfo', false)) {  // PHP 5.3 以下不是默认支持     
            $upload->addValidator('MimeType', false, self::$allowMimeType);
        } else {
            // 使用 imagegetsize 返回的mimetype
            $upload->addPrefixPath('Ediary', 'Ediary/');
            $upload->addValidator('OldMimeType', false, self::$allowMimeType);
        }
    }
}