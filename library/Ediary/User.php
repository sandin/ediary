<?php
class Ediary_User
{
    // Table Field
    const ID = 'user_id';
    const NAME = 'user_name';
    const EMAIL = 'user_email';
    const PASSWORD = 'user_pass';
    const SECURITY_CODE = 'user_security';
    const CREATED = 'user_created';
    const LAST_TIME = 'user_lasttime';
    const ACCOUNT = 'user_account';
    const PIC = 'user_pic';

    // Zend_Db_Table
    private static $table = null;
    private $db = null;

    private $mId = 0;
    private $mName = '';
    private $mEmail = '';
    private $mPic = '';
    private $mCreated = '';
    private $mLastTime = '';
    private $mAccount = 0;
    private $mPassword = '';
    private $mSecurityCode = '';

    public function __construct() {
        if (NULL == self::$table) {
            self::$table = new Zend_Db_Table('users');
        }
        $this->db = Zend_Db_Table::getDefaultAdapter();
    }

    /**
     * Get the user's name
     *
     * @return string
     */
    public function getName() {
        return $this->mName;
    }

    /**
     * Get the user's ID
     *
     * @return int
     */
    public function getId() {
        return $this->mId;
    }

    /**
     * New a User from one row data
     *
     * @param Array $row
     * @return Ediary_User
     */
    public static function newFromRow( $row ) {
        $user = new Ediary_User();
        $user->loadFromRow($row);
        return $user;
    }

    /**
     * Load User data from a row
     *
     * @param Array $row
     */
    public function loadFromRow( $row ) {
        if (isset($row[self::ID])) {
            $this->mId = $row[self::ID];
        }

        $this->mEmail = $row[self::EMAIL];
        $this->mName = $row[self::NAME];
        $this->mPassword = $row[self::PASSWORD];
        $this->mSecurityCode = $row[self::SECURITY_CODE];
        $this->mCreated = $row[self::CREATED];
        $this->mLastTime = $row[self::LAST_TIME];
        $this->mAccount = $row[self::ACCOUNT];
        $this->mPic = $row[self::PIC];
    }

    public function findById($userId) {
        $this->_table->find($userId);
    }

    public function findByName($userName) {
    }

    /**
     * Create a User
     *
     * @param String $email
     * @param String $name
     * @param String $password
     * @return int The number of affected rows. | return -1 on fail.
     */
    public function create($email, $name, $password) {
        if ( self::isValidUserName($name) && self::isValidEmail($email)
                && self::isValidPassword($password) ) {
            return $this->insert($email, $name, $password);
        }
        return -1;
    }

    /**
     * Check user name
     *
     * @param String $name
     * @return boolean
     */
    public static function isValidUserName($name) {
        //FIXME:
        return true;
    }

    /**
     * Check Email
     *
     * @param String $name
     * @return boolean
     */
    public static function isValidEmail($email) {
        //FIXME:
        return true;
    }
    /**
     * Check Password
     *
     * @param String $name
     * @return boolean
     */
    public static function isValidPassword($password) {
        //FIXME:
        return true;
    }

    /**
     * Check The email is exists or not
     *
     * @param String $email
     * @return boolean
     */
    public function isExistsEmail($email) {
        $sql = $this->db->quoteInto(
        	'SELECT count(*) FROM users where user_email= ?', $email);
        $result = $this->db->fetchOne($sql);
        return ($result > 0) ? true : false;
    }

    /**
     * Make a random string
     *
     * @param unknown_type $keyword
     * @return string
     */
    public static function makeSecurityCode($keyword) {
        return md5($keyword . microtime() . 'lds');
    }

    /**
     * Use MD5 to encrypt the password
     *
     * @param unknown_type $password
     * @param unknown_type $securityCode
     * @return string
     */
    public static function encryptPassword($password, $securityCode) {
        return md5( md5($password) . $securityCode . 'lds' );
    }

    /**
     * Insert a row into database
     *
     * @param String $email
     * @param String $name
     * @param String $password
     * @return int The number of affected rows.
     */
    private function insert($email, $name, $password){
        $now = Ediary_Database_Db::formator(time());
        $securityCode = self::makeSecurityCode($email);
        $encodedPassword = self::encryptPassword($password, $securityCode);
         
        $data = array(
            self::EMAIL => $email,
            self::NAME  => $name,
            self::PASSWORD => $encodedPassword,
            self::SECURITY_CODE => $securityCode,
            self::CREATED => $now,
            self::LAST_TIME => $now
        );
         
        return self::$table->insert($data);
    }

    public function delete($userId){}

    public function update($userId){}

}
