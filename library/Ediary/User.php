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

    private $mId = 0; // Use getId() instend
    public  $mName = '';
    public  $mEmail = '';
    public  $mPic = '';
    public  $mCreated = '';
    public  $mLastTime = '';
    public  $mAccount = 0;
    private $mPassword = '';
    private $mSecurityCode = ''; 
    
    private $isLoad = false;

    public function __construct() {
        $this->db = Ediary_Database_Db::getInstance();
        if (NULL == self::$table) {
            self::$table = new Zend_Db_Table($this->db->users);
        }
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
     * Has loaded or not
     * 
     * @return boolean
     */
    public function isLoad() {
        return $this->isLoad;
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
    public function loadFromArray( $userData ) {
        if (! is_array($userData)) 
            throw new Ediary_Exception('$userData must be an Array');
        
        if (isset($userData[self::ID])) {
            $this->mId = $userData[self::ID];
        }
        $this->mEmail = $userData[self::EMAIL];
        $this->mName = $userData[self::NAME];
        $this->mPassword = $userData[self::PASSWORD];
        $this->mSecurityCode = $userData[self::SECURITY_CODE];
        $this->mCreated = $userData[self::CREATED];
        $this->mLastTime = $userData[self::LAST_TIME];
        $this->mAccount = $userData[self::ACCOUNT];
        $this->mPic = $userData[self::PIC];
        
        $this->isLoad = true;
        return $this;
    }
    
    /**
     * Load User from a row(From Database)
     * 
     * @param Zend_Db_Table_Row $row
     * @throws Ediary_Exception $row is not a Zend_Db_Table_Row
     */
    public function loadFromRow( $row ) {
        if (! $row instanceof Zend_Db_Table_Row) 
            throw new Ediary_Exception('$row must be a Zend_Db_Table_Row');
            
        $userData = $row->toArray();
        $this->loadFromArray($userData);
    }

    /**
     * Load user by Id
     * 
     * @param int $userId
     * @return Ediary_User
     */
    public function loadById( $userId ) {
        $row = self::$table->find($userId)->current();
        $this->loadFromRow($row);
        return $this;
    }

    /**
     * Load user by Email
     * 
     * @param String $email
     * @return Ediary_User
     */
    public function loadByEmail( $email ) {
        $select = self::$table->select()
                       ->where(self::EMAIL . ' = ?', $email)
                       ->limit(1,0);
        $row = self::$table->fetchRow($select);
        $this->loadFromRow($row);
        return $this;
    }

    /**
     * Create a User
     *
     * @param String $email
     * @param String $name
     * @param String $password
     * @return int new user'id (last insert id) | return -1 on fail.
     */
    public function create( $email, $password, $name = '' ) {
        if ( self::isValidUserName($name) && self::isValidEmail($email)
                && self::isValidPassword($password) ) {
            return $this->insert($email, $password, $name);
        }
        return -1;
    }
    
    /**
     * isValid Factory
     * 
     * @param String $key see self::const, such as self::NAME...
     * @param String $value value 
     * @return boolean
     */
    public static function isValid($key, $value) {
        switch ($key) {
            case self::NAME :
                return self::isValidUserName($value);
                break;
            case self::PASSWORD :
                return self::isValidPassword($value);
                break;
            case self::EMAIL :
                return self::isValidEmail($value);
                break;
        }
        return true; // no need to check
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
     * Get a particular user's securtiy code
     * 
     * @param String $email
     */
    private static function getSecurtiyCode($email) {
        $select = self::$table->select()
                       ->from($this->table->getName(), array(self::SECURITY_CODE))
                       ->where(self::EMAIL . ' = :email ')
                       ->bind(array('email' => $email))
                       ->limit(1, 0);
        return self::$table->fetchOne($select);
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
     * @param String $password
     * @param String $name
     * @return int the last insert id
     */
    private function insert($email, $password, $name = '') {
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

    /**
     * Delete a Row
     * @param int $userId
     */
    public function delete($userId){
        $where = $this->db->quoteInto(self::ID . '= ?', $useId);
        return self::$table->delete($where);
    }

    /**
     * Update a Row
     * 
     * @param int $userId
     * @param Array $userData {self::const => $value, ...}
     * @return int The number of affected rows. | -1 on userData is not valid
     */
    public function update($userId, $userData) {
        // Check All Input User Data is valid or not
        foreach ($userData as $key => $value) {
            if (! self::isValid($key, $value) ) {
                return -1; //is not a valid data
            }
        }
        $where = $this->db->quoteInto(self::ID . '= ?', $useId);
        return self::$table->update($userData, $where);
    }
    
    /**
     * Auth User and save the auth result into session
     * 
     * @param String $email
     * @param String $password
     * @return Zend_Auth_Result stdClass { boolean result, String message }
     */
    public function login($email, $password) {
        $result = new stdClass();
        $result->result  = false;
        $result->message = '';
        
        $password = self::getSecurityCode($email);
        
        $auth = Zend_Auth::getInstance();
        
        $storage = new Zend_Auth_Storage_Session();
        $namespace = $storage->getNamespace();
        //$storage->setExpirationHops(5);
        //$storage->setExpirationSeconds(3);
        
        $auth->setStorage($storage);
        $authAdapter = new Zend_Auth_Adapter_DbTable($$this->db);
        $authAdapter->setTableName($this->db->users)
                    ->setIdentityColumn(self::EMAIL)
                    ->setCredentialColumn(self::PASSWORD)
                    ->setIdentity($email)
                    ->setCredential($password);

        // 执行认证查询，并保存结果
        $result = $auth->authenticate($authAdapter);
        if (!$result->isValid()) {
            // Authentication failed; print the reasons why
            $result->result =  false;
            $result->message = $result->getMessages() ;
        } else {
            $identity = $result->getIdentity();
            //Zend_Debug::dump($identity);

            $storage = $auth->getStorage();
            $storage->write($authAdapter->getResultRowObject(
                                array(self::EMAIL,self::NAME, self::ID)));

            // set a cookie to save user info
            setcookie('ue', $user, time() + 2592000, '/', false);
            //TODO
            Zend_Session::rememberMe(2592000);
            $result->result = true;
        }

        return $result;
    }

}
