<?php

/**
 * Database
 *
 * @author lds
 *
 */
class Ediary_Database_Db
{

    /**
     * Database version
     *
     * @var int
     */
    private $version = 0;

    /**
     * Database prefix
     *
     * @var String
     */
    private $prefix = '';

    private $tableSet = '';

    /**
     * Tables name
     * @var Array<String>
     */
    private $tables = array('users', 'usermeta', 'diarys', 'journals', 'themes', 'sessions', 'files'); 

    //Tables Name - has prefix
    public $users;
    public $usermeta;
    public $sessions;
    public $themes;
    public $files;
    public $diarys;
    public $journals;

    /**
     * Database Connection
     *
     * @var Zend_Db_Adapter_Abstract 
     */
    private $conn = null;

    // Singleton

    /**
     * This instance
     *
     * @var Ediary_Database_Db
     */
    private static $instance;

    /**
     * PRIVATE, use Ediary_Database_Db::getInstance()
     */
    private function __construct() {
    }

    /**
     * Get Database Instance
     *
     * @return Ediary_Database_Db
     */
    public static function getInstance() {
        if (! isset(self::$instance) ) {
            self::$instance = new self();
        }
         
        return self::$instance;
    }

    public function __clone() {
        trigger_error("This Object Cann't be Clone, It's a Singleton Object.", E_USER_ERROR);
    }


    // METHODS

    /**
     * Set Tables prefix
     *
     * @param String $prefix
     * @throws Ediary_Exception invalid prefix
     */
    public function setPrefix($prefix) {
        if ( preg_match( '|[^a-z0-9_]|i', $prefix ) ) {
            throw new Ediary_Exception(_t("数据库前缀不能允许数字字母和下划线."));
        }
         
        $this->_prefix = $prefix;
        foreach ($this->tables as $table) {
            $this->$table = $this->_prefix . $table ;
        }
    }
    
    /**
     * Add prefix to the table name
     * 
     * @param String $tableName
     * @return string prefixed
     */
    public function prefix($tableName) {
        return $this->_prefix . $tableName;
    }

    /**
     * Set Database Connection
     *
     * @param  Zend_Db_Adapter_Abstracta $conn
     * @return Ediary_Database_Db
     */
    public function setConnection($conn) {
        $this->conn = $conn;
        return $this;
    }

    /**
     * Get the connection
     *
     * @return Zend_Db_Adapter_Abstracta Database connection
     */
    public function getConnection() {
        return $this->conn;
    }

    /**
     * Connect to the Database
     *
     * @throws Ediary_Database_Exception When cann't connect to the database
     *
     * @return boolean
     */
    public function connect() {
        try {
            if (NULL !== $this->conn) {
                $this->conn->getConnection();
            } else {
                return false;
            }
        } catch (Exception $e) {
            throw new Ediary_Database_Exception($e->getMessage(), $e->getCode(), $e);
        }
         
        return true;
    }

    public function test() {
         
    }

    /**
     * Whether Database is installed or not
     *
     * @return boolean
     */
    public function isInstalled() {
        $result = $this->query("SHOW TABLES");
        return ( $result->rowCount() > 0 );
    }

    /**
     * Create Tables
     * NOTE: use create(), must setPrefix() first
     */
    public function create($force = false) {
        if ( $force || $this->isInstalled() ) { 
            return Ediary_Logger::log('The application is already installed');
        }

        // Setup charset and collation
        $charset_name = $this->getConfig()->charset ;
        $collation_name = 'utf8_general_ci';

        $this->dbname = $this->getConfig()->dbname;
        $this->tableSet = ' CHARACTER SET ' . $charset_name
                        . ' COLLATE ' . $collation_name;

        $imdb = $this;
        include 'schema.php'; //defined $query

        return $this->conn->query($query);
    }

    /**
     * Execute a sql query file
     *
     * @param String $sqlfile sql file name
     * @throws Ediary_Database_Exception sql file is missing or cann't execute the query
     * @return boolean Is succeed
     */
    public function queryFile($sqlfile) {
        $result = false;
        if (file_exists($sqlfile)) {
            try {
                // READ SQL QUERY IN THE FILE
                $sql = file_get_contents($sqlfile);
                $result = $this->query($sql);
            } catch (Zend_Db_Exception $db_e) {
                throw new Ediary_Database_Exception(
                    $db_e->getMessage(), $db_e->getCode(), $db_e);
            }
            $result = ( $result->rowCount() > 0 );
        } else {
            throw new Ediary_Database_Exception('SQL FILE is missing : ' . $sqlfile);
        }

        return $result;
    }

    /**
     * @deprecated ONLY FOR DEBUG
     */
    private function drop() {
        foreach ($this->tables as $table) {
            $this->query('DROP TABLE IF EXISTS '. $table );
        }
    }

    public function upgrade() {
        if ($this->isInstalled() ) {
            $this->drop();
            $this->create(true);
            Ediary_Logger::log("Database has been upgraded.");
        }
    }

    /**
     * Close the connection
     *
     * @return boolean always true
     */
    public function close() {
        if (null != $this->conn && $this->conn->isConnected()) {
            $this->conn->closeConnection();
        }
        return true;
    }

    /**
     * Get database config, such as username, host, dbname
     *
     * @return stdClass {username, dbname, host, charset}
     */
    public function getConfig() {
        $config = new stdClass();

        if (NULL !== $this->conn) {
            $c = $this->conn->getConfig();
            $config->username = $c['username'];
            $config->dbname = $c['dbname'];
            $config->host = $c['host'];
            $config->charset =$c['charset'];
        }

        return $config;
    }

    /**
     * Call $this->connection->xxx instead
     *
     * @see Zend_Db_Adapter_Abstract
     *
     * @param String $method
     * @param Array $args
     * @throws Ediary_Database_Exception which case by Zend_Db_Apapter_Exception
     * @throws Ediary_Exception which case by unknown reason
     *
     * @return mixed
     */
    public function __call($method, $args) {
        if (method_exists($this->conn, $method)) {
            $caseBy = 'Case by : ' . $method . ' : ';
            try {
                return call_user_func_array(array($this->conn, $method), $args);
            } catch (Zend_Db_Adapter_Exception $db_e) {
                throw new Ediary_Database_Connection_Exception($caseBy . $db_e->getMessage(),
                     $db_e->getCode(), $db_e);
            } catch (Zend_Db_Statement_Exception $dbs_e) {
                throw new Ediary_Database_Exception($caseBy . $dbs_e->getMessage(),
                     $dbs_e->getCode(), $dbs_e);
            } catch (Exception $e) {
                throw new Ediary_Exception($caseBy . $e->getMessage(), $e->getCode(), $e);
            }
        } else {
            throw new Ediary_Exception('Call Unknown Method : ' . $method );
        }
    }

    /**
     * Format a data, like : '0000-00-00 00:00:00'
     * 
     * @param int $timestamp unix-timestamp
     * @return string '0000-00-00 00:00:00'
     */
    public static function formator($timestamp = null) {
        return date('Y-m-d H:i:s', $timestamp);
    }
    
    /**
     * Get current data/time like '0000-00-00 00:00:00'
     * @return string
     */
    public static function now() {
        return self::formator(time());
    }
    
    /**
     * Get today data like '0000-00-00 00:00:00'
     * @return string
     */
    public static function today() {
         return self::formator(mktime(0,0,0,date("m"),date("d"),date("Y")));
    }

    /**
     * addslashes for string, shortcut for Zend_Db->quote
     * 
     * @param String $str
     * @return string safe string
     */
    public static function quote($str) {
        return self::getInstance()->quote($str);
        //return addslashes($str); // unsafe 0xbf5c
    }
    
    /**
     * TODO: Maximum function nesting level of '100' 
     * addslashes for array
     * 
     * @param Array $array
     * @return Array safe array
     */
    public static function addMagicQuotes( $array ) {
        foreach ( (array) $array as $k => $v ) {
            if ( is_array( $v ) ) {
                $array[$k] = self::addMagicQuotes( $v );
            } else {
                $array[$k] = self::quote( $v );
            }
        }
        return $array;
    }
    
    /**
     * Fetches the first row of the SQL result.
     * Uses the current fetchMode for the adapter.
     *
     * @param string|Zend_Db_Select $sql An SQL SELECT statement.
     * @param mixed $bind Data to bind into SELECT placeholders.
     * @param mixed                 $fetchMode Override current fetch mode.
     * @return array
     */
    public function fetchRow($sql, $bind = array(), $fetchMode = null) {
        return $this->conn->fetchRow($this->prefixTables($sql), $bind, $fetchMode);
    }
    
    /**
     * Fetches all SQL result rows as a sequential array.
     * Uses the current fetchMode for the adapter.
     *
     * @param string|Zend_Db_Select $sql  An SQL SELECT statement.
     * @param mixed                 $bind Data to bind into SELECT placeholders.
     * @param mixed                 $fetchMode Override current fetch mode.
     * @return array
     */
    public function fetchAll($sql, $bind = array(), $fetchMode = null) {
        return $this->conn->fetchAll($this->prefixTables($sql), $bind, $fetchMode);
    }
    
    /**
     * Fetches the first column of the first row of the SQL result.
     *
     * @param string|Zend_Db_Select $sql An SQL SELECT statement.
     * @param mixed $bind Data to bind into SELECT placeholders.
     * @return string
     */
    public function fetchOne($sql, $bind = array()) {
        return $this->conn->fetchOne($this->prefixTables($sql), $bind);
    }
    
    // TODO: other fetch methods
    
    /**
     * Add table prefix 
     * like: {user} => $prefix . user
     * 
     * @param String $sql
     * @return string sql
     */
    public function prefixTables($sql) {
        // Then replace remaining tables with the default prefix.
        return strtr($sql, array('{' => $this->prefix, '}' => ''));
    }
    

}
