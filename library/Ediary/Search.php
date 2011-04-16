<?php
/**
 * Enter description here ...
 * @author lds
 *
 * @deprecated 未完成, 暂时使用 MYSQL FULLTEXT 来实现搜索功能
 */
class Ediary_Search
{
    private $cacheDir = null;
    private $indexFile = null;
    
    public function __construct( $options = array() ) {
        $this->cacheDir = APPLICATION_PATH . '/cache/search/';
        $this->prepareDir();
        $this->indexFile = (isset($options['indexFile'])) 
                           ? $this->cacheDir . $options['indexFile'] 
                           : $this->cacheDir . 'index';
    }
    
    private function prepareDir() {
        if (! file_exists($cacheDir)) {
            return mkdir($this->cacheDir);
        }
        return true;
    }
    
    public function updateIndex($create = false) {
        $index = new Zend_Search_Lucene($this->indexFile, $create);
        
        $doc = new Zend_Search_Lucene_Document();
        
    }
}