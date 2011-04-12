<?php

class Ediary_Database_Schema {
    
    /**
     * @var Ediary_Db
     */
    private $db = null;
    
    /**
     * @var PDO
     */
    private $dbh = null;
    
    /**
     * @var Ediary_Logger
     */
    private $logger = null;
    
    private static $isInstalled = false;

    /**
     * List of create table sql
     * 
     * @var Array<String tableName : String createSql>
     */
    private $tables = array(
        'users' => "CREATE TABLE {users} (
            id              bigint(20)     unsigned NOT NULL auto_increment,
            email           varchar(100)   NOT NULL default '', 
            username        varchar(50)    NOT NULL default '',
            password        varchar(64)    NOT NULL default '',
            security_code   varchar(32)    NOT NULL default '',
            created_at      datetime       NOT NULL default '0000-00-00 00:00:00',
            last_logined    datetime       NOT NULL default '0000-00-00 00:00:00',
            account         int(11)        NOT NULL default '0',
            theme           varchar(100)   NOT NULL default 't0',
            photo           varchar(100)   NOT NULL default '',

            PRIMARY KEY (id),
            UNIQUE KEY user_email (email)
        ) %s AUTO_INCREMENT = 10000000;",
        'usermeta' => "CREATE TABLE {usermeta} (
            umeta_id    bigint(20)   unsigned NOT NULL auto_increment,
            user_id     bigint(20)   unsigned NOT NULL default '0',
            meta_key    varchar(255) default NULL,
            meta_value  longtext,
      
            PRIMARY KEY  (umeta_id),
            KEY user_id  (user_id),
            KEY meta_key (meta_key)
        ) %s;",
        'diarys' => "CREATE TABLE {diarys} (
            id  bigint(20)      unsigned NOT NULL auto_increment,
            title           text           NOT NULL,
            content         longtext       NOT NULL,
            weather         varchar(255)   NOT NULL default '',
            mood            varchar(11)    NOT NULL default '',
            status          varchar(20)    NOT NULL default 'private',
            created_date    date           NOT NULL default '0000-00-00',
            created_time    time           NOT NULL default '00:00:00',
            saved_at        datetime       NOT NULL default '0000-00-00 00:00:00',
            user_id         bigint(20)     unsigned NOT NULL default '0',
            journal_id      bigint(20)     unsigned NOT NULL default '0',

            PRIMARY KEY (id),
            KEY diary_author (user_id),
            KEY journal (journal_id)
        ) %s AUTO_INCREMENT = 10000000",
        'journals' => "CREATE TABLE {journals} (
            id          bigint(20)     unsigned NOT NULL auto_increment,
            title       varchar(200)   NOT NULL default '',
            created_at  datetime       NOT NULL default '0000-00-00 00:00:00',
            user_id     bigint(20)     unsigned NOT NULL default '0',

            PRIMARY KEY (id),
            KEY journal_owner (user_id)
        ) %s;",
        'themes' => "CREATE TABLE {themes} (
            id         bigint(20)      unsigned NOT NULL auto_increment,
            name       varchar(100)    NOT NULL default '',

            PRIMARY KEY (id),
            UNIQUE KEY name (name)
        ) %s;",
        'files' => "CREATE TABLE {files} (
            `id`       bigint(20)       unsigned NOT NULL AUTO_INCREMENT,
            `diary_id` bigint(20)       unsigned NOT NULL DEFAULT '0',
            `user_id`  bigint(20)       unsigned NOT NULL DEFAULT '0',
            `filename` varchar(255)     NOT NULL DEFAULT '',
            `filepath` varchar(255)     NOT NULL DEFAULT '',
            `filemime` varchar(255)     NOT NULL DEFAULT '',
            `filesize` varchar(100)     NOT NULL DEFAULT '',
            `status`   int(11)          NOT NULL DEFAULT '0',
            `timestamp` int(10)         unsigned NOT NULL DEFAULT '0',
      
            PRIMARY KEY (`id`),
            KEY `diary_id` (`diary_id`)
        ) %s;",
        'sessions' => "CREATE TABLE {sessions} (  
            `id`        char(32)    collate utf8_unicode_ci NOT NULL,  
            `modified`  int(10)     NOT NULL,  
            `lifetime`  int(10)     NOT NULL,  
            `data`      text        collate utf8_unicode_ci NOT NULL,  
            PRIMARY KEY (`id`)  
        ) %s ENGINE=MyISAM;"
    );  
    
    private $tabls = array();
    
    /**
     * Enter description here ...
     * @param Ediary_Db $db
     */
    public function __construct($db) {
        $this->db = $db;
        $this->dbh = $db->getConnection()->getConnection();
        $this->logger = Ediary_Logger::getInstance();
    }
    
    /**
     * Create all build-in tables
     * 
     * @return boolean
     */
    public function createTables($force = false) {
        if ($force || )
        $this->dbh->beginTransaction();
        foreach ($this->tables as $tableName => $sql) {
            $this->_createTable($tableName, $sql);
        }
        return $this->dbh->commit();
    }
    
    // for createTables
    private function _createTable($tableName, $sqlTemplate) {
        $sql = self::formatSql($sqlTemplate, $this->db->getTableSet());
        return $this->createTable($tableName, $sql);
    }
    
    /**
     * Create a table 
     * 
     * @param String $tableName without prefix
     * @param String $sql
     * @return boolean if false check getError();
     * @throws PDOException
     */
    public function createTable($tableName, $sql) {
        $this->dropTable($tableName);
        $result = $this->dbh->exec($sql);
        if ($result !== false) {
            $this->logger->log("Create table: " . $tableName);
            return true;
        }
        return false;
    }
    
    /**
     * drop a table 
     * 
     * @param String $tableName without prefix
     */
    private function dropTable($tableName) {
        $this->logger->log("Drop table: " . $tableName);
        $this->dbh->exec(sprintf("DROP TABLE IF EXISTS %s",
                                 Ediary_Db::prefix($tableName)));
    }
    
    public function getError() {
        return $this->dbh->errorInfo();
    }
    
    /**
     * Format sql query
     * 
     * @param String $sql sql template
     * @param String $tableName
     * @param Array|String $tableOptions CHARACTER SET etc.
     * @return string sql query 
     */
    public static function formatSql($sqlTemplate, $tableOptions = array()) {
        $options = "";
        if (is_array($tableOptions)) {
            foreach ($tableOptions as $option) {
                $options .= " " + option;
            }
        } else {
            $options .= $tableOptions;
        }
        return Ediary_Db::prefixTables(sprintf($sqlTemplate, $options));
    }
    
    /**
     * Get all create sql as a string 
     * 
     * @return string
     */
    public function getCreateSql() {
        $sql = "";
        foreach ($this->tables as $tableName => $sqlTemplate) {
            $tmp = self::formatSql($sqlTemplate, $this->db->getTableSet());
            $sql .= (substr($tmp, -1) === ';') ? $tmp : $tmp . ';';
        } 
        return $sql;
    }
    
}
