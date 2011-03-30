<?php
class Ediary_Admin_Theme extends Ediary_Query_Record
{
   /**
     * Default fields
     *
     * @var Array
     */
    private static $defaultFields = array(
        /* id */
        'name' => '',
    );
    
    /**
     * Construct
     * 
     * @param Array $params initial field values
     */
    public function __construct($params = array()) {
        $this->fields = array_merge(
            $this->fields,
            self::$defaultFields
        );
        parent::__construct($params);
    } 
    
    /**
     * 清空并更新新数据
     * 
     * @param Array $themes list of themes 如果不提供就会使用主题目录下的所有文件夹名 
     * @return boolean
     */
    public function update($themes = null) {
        self::dump();
        return $this->install($themes);
    }
    
    /**
     * 写入一条数据
     * 
     * @return boolean
     */
    public function insert() {
        return parent::insertRow(self::getDb()->themes);
    }
    
    /**
     * 删除表中所有列, 更新表时用
     */
    public static function dump() {
        $db = self::getDb();
        return $db->query("DELETE FROM " . $db->themes . "");
    }
    
    /**
     * 安装主题
     * 
     * @param Array $themes list of themes 如果不提供就会使用主题目录下的所有文件夹名 
     * @return boolean
     */
    public function install($themes = null) {
        $db =  self::getDb();
        $themes = ( isset($theme) ) ? $themes : self::getThemesFormDir();
        
        $result = array();
        foreach ($themes as $theme) {
            $this->name = $theme['name'];
            $result[] = $this->insert();
        }
        return ( count($result) > 0 && !in_array(false, $result) );
    }
    
    public function findAll() {
        $db = self::getDb();
        return $db->fetchAll("SELECT * FROM {themes}");
    }
    
    public static function getThemesFormDir() {
      // action body
        $themePath = APPLICATION_PATH . '/../public/theme';
        $themes = array();
        
        if ($handle = opendir($themePath)) {
            while ( false !== ($file = readdir($handle)) ) {
                if ($file != '.' && $file != '..') {
                    $themes[]['name'] = $file; 
                }
            }
        }
        return $themes;
    }
}