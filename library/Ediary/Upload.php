<?php
class Ediary_Upload 
{
    /**
     * @var String Upload dir
     */
    protected $_path;
    
    /**
     * @var Ediary_Logger
     */
    private $logger; 
    
    /**
     * @var Zend_File_Transfer_Adapter_Http
     */
    protected $_fileTrasfer;
    
    /**
     * @param String $pathname 上传目录
     */
    public function __construct($pathname) {
        $this->logger = Ediary_Logger::getInstance();
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
            $this->logger->log("上传目录不可写", Zend_Log::ERR);
            throw new Ediary_Exception("Cann't mkdir : " . $pathname);
        }
        $this->_path = realpath($pathname);
    }
    
    /**
     * @return Zend_File_Transfer_Adapter_Http
     */
    public function getAdapter() {
        return $this->_fileTrasfer;
    }
    
    /**
     * Shortcut for Zend_File_Transfer_Adapter_Http->getFilename()
     * 
     * @return String filename
     */
    public function getFilename() {
        return $this->_fileTrasfer->getFilename();
    }
    
    public function getError() {
        return $this->_fileTrasfer->getErrors();
    }
    
    /**
     * get upload dir path
     * @return string
     */
    public function getPath() {
        return $this->_path;
    }
    
    protected function setUpFileTrasfer() {
        $upload = $this->_fileTrasfer;
        $upload->setDestination($this->_path);
        foreach ($upload->getFileInfo() as $file) {
            // unique file name 
            // TODO: 文件名处理下, 中文 空格等
            $filename = $this->_path . '/' . time() . $file['name'];
            $upload->addFilter('Rename', array('target' => $filename,
                			   'overwrite' => true), $file['name'] );
        }
        return $upload;
    }
    
    /**
     * Try to receive post file 
     * 
     * @param String $inputName
     * @return boolean 
     */
    public function recevie($inputName = null) {
        $upload = $this->setUpFileTrasfer();
        try {
            return $upload->receive();
        } catch (Exception $e) {
            Ediary_Logger::log2($e->getMessage());
            return false;
        }
    }
    
    /**
     * 将上传的文件的信息存入数据库
     * 
     * @param $user_id file owner's id
     * @param $diary_id diary's id
     * @return mixed(Array|NULL) return file info on Success
     * 							 return NULL when cann't insert into DB
     */
    public function store($user_id, $diary_id) {
        $adapter = $this->_fileTrasfer;
        if ( !$adapter->isReceived() ) {
            return;
        } 
        //TODO: getFileName 一系列函数都可能返回数组
        $fileInfo = array(
        	'user_id'  => $user_id,
            'diary_id' => $diary_id, 
        	'filename' => self::stripUniqueKey($adapter->getFileName(null, false)), 
        	'filepath' => self::getRelativePath($adapter->getFileName(null, true)),
            'filemime' => $adapter->getMimeType(),
        	'filesize' => $adapter->getFileSize()
        );

        $file = new Ediary_File($fileInfo);
        if ( $file->insert() ) {
            $fileInfo['id'] = $file->id;
            return $fileInfo;
        }
    }
    
    /**
     * Strip the unique key
     * like '1301795971menu.png' => 'menu.png'
     * 
     * @param String $filename
     * @return string
     */
    public static function stripUniqueKey($filename) {
        return substr($filename, 10);
    }
    
    /**
     * 使用按年/月的目录结构对上传文件进行储存
     * 
     * @return boolean
     */
    public function useSubDir($useOrNot = true) {
        if ($useOrNot) {
            $this->_path = self::getCurrentUploadDir($this->_path);
            return Ediary_Utility_File::mkdir($this->_path);
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
        return str_replace(realpath(PUBLIC_PATH), '', $pathname);
    }
    
    
}