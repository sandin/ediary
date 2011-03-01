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
    private $tables = array('users', 'diarys', 'books');

    /**
     * Table Name - users
     * @var String
     */
    public $users;

    /**
     * Table Name - diarys
     * @var String
     */
    public $diarys;

    /**
     * Table Name - books
     * @var String
     */
    public $books;

    /**
     * Database Connection
     *
     * @var Zend_Db_Adapter_Abstracta
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
     * NOTE: Class setPrefix() first
     */
    public function create() {
        if ( $this->isInstalled() )
        return; // already installed

        // Setup charset and collation
        $charset_name = $this->getConfig()->charset ;
        $collation_name = 'utf8_general_ci';

        $this->dbname = $this->getConfig()->dbname;
        $this->tableSet = ' CHARACTER SET ' . $charset_name
        . ' COLLATE ' . $collation_name;

        $imdb = $this;
        include 'schema.php'; //defined $query

        //var_dump($query);
        return $this->query($query);
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
            try {
                return call_user_func_array(array($this->conn, $method), $args);
            } catch (Zend_Db_Adapter_Exception $db_e) {
                throw new Ediary_Database_Exception($db_e->getMessage(), $db_e->getCode(), $db_e);
            } catch (Exception $e) {
                throw new Ediary_Exception($e->getMessage(), $e->getCode(), $e);
            }
        } else {
            throw new Ediary_Database_Exception('Call Unknown Method : ' . $method );
        }
    }

    public static function formator($timestamp) {
        return date('Y-m-d H:i:s');
    }

    public function escape($str) {
        if (function_exists('mysql_real_escape_string')) {
            return mysql_real_escape_string(trim($str));
        } else {
            return addslashes($str); // unsafe 0xbf5c
        }
    }

}
