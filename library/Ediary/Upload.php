<?php
class Ediary_Upload 
{
    private $_path;
    private $_fileTrasfer;
    
    /**
     * @param String $pathname 上传目录
     */
    public function __construct($pathname) {
        $this->setPath($pathname);
        $this->_fileTrasfer = new Zend_File_Transfer_Adapter_Http();
    }
    
    /**
     * 设置上传文件的储存目录, 如果目录不存在则尝试创建
     * 
     * @param String $pathname
     * @throws Ediary_Exception when cann't create dir
     */
    public function setPath($pathname) {
        if (! Ediary_Utility_File::mkdir($pathname)) {
            throw new Ediary_Exception("Cann't mkdir : " . $pathname);
        }
        $this->_Path = realpath($pathname);
    }
    
    public function getTrasfer() {
        return $this->_fileTrasfer;
    }
    
    public function getPath() {
        return $this->_path;
    }
    
    /**
     * Try to receive post file
     * 
     * @param String $inputName
     * @return boolean 
     */
    public function recevie($inputName = null) {
        $upload = $this->_fileTrasfer;
        $upload->setDestination($this->_Path);
        foreach ($upload->getFileInfo() as $file) {
            // unique file name
            $filename = $this->_Path . '/' . time() . $file['name'];
            $upload->addFilter('Rename', array('target' => $filename,
                'overwrite' => true), $file['name'] );
        }
        try {
            return $upload->receive();
        } catch (Zend_File_Transfer_Exception $e) {
            Ediary_Logger::log($e->getMessage());
        }
    }
    
    /**
     * 将上传的文件的信息存入数据库
     * 
     * @param $user_id file owner's id
     * @param boolean True on Success, false if not 
     */
    public function store($user_id) {
        $adapter = $this->_fileTrasfer;
        if ( !$adapter->isReceived() ) {
            return;
        } 
        //TODO: getFileName 一系列函数都可以是返回数组
        $fileInfo = array(
        	'user_id'  => $user_id,
        	'filename' => substr($adapter->getFileName(null, false), 10), // strip the unique key
        	'filepath' => self::getRelativePath($adapter->getFileName(null, true)),
            'filemime' => $adapter->getMimeType(),
        	'filesize' => $adapter->getFileSize()
        );

        $file = new Ediary_File($fileInfo);
        return $file->insert();
    }
    
    /**
     * 使用按年/月的目录结构对上传文件进行储存
     * 
     * @return boolean
     */
    public function useSubDir($useOrNot = true) {
        if ($useOrNot) {
            $this->_Path = self::getCurrentUploadDir($this->_Path);
            return Ediary_Utility_File::mkdir($this->_Path);
        }
    }
    
    /**
     * 按年/月进行分目录 例如 "/uploads/2011/12/"
     * 
     * @param String $pathname upload root
     * @return string
     */
    public static function getCurrentUploadDir($pathname) {
        return $pathname . '/' . date('Y') . '/' . date('M') . '/';
    }
    
    /**
     * 获得路径相对路径(相对于application的public目录)
     * @param String $pathname
     * @return mixed
     */
    public static function getRelativePath($pathname) {
        $root = realpath(APPLICATION_PATH . '/../public');
        return str_replace($root, '', $pathname);
    }
    
    
}