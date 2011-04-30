<?php
/**
 * oauth-php helper
 * oauth-php location: /libray/oauth-php/
 * 
 * @author lds
 *
 */
class Ediary_OAuth
{
    /**
     * @var OAuthStore
     */
    private static $_store = null; 
    
    public static function initStore() {
        if (self::$_store == null) {
            $pdo = Ediary_Db::getInstance()->getAdapter()->getConnection();
            self::$_store = OAuthStore::instance('PDO', array('conn' => $pdo));
        }
    }
    
    public static function install() {
        self::installDb();
    }
    
    private static function installDb() {
        $db = Ediary_Db::getInstance();

        $sql = file_get_contents(APPLICATION_PATH . '/../library/oauth-php/library/store/mysql/mysql.sql');
        $ps  = explode('#--SPLIT--', $sql);

        foreach ($ps as $p)
        {
            $p = preg_replace('/^\s*#.*$/m', '', $p);

            $db->query($p);
            if (mysql_errno())
            {
                die(' Error '.mysql_errno().': '.mysql_error());
            }
        }
        return true;
    }
    
    /**
     * 检验OAuth身份, 身份验证失败则使用 exit 退出.
     * @throws OAuthException2, 身份验证失败, 或请求中不携带OAuth信息.
     * @return Ediary_User user or NULL
     */
    public static function authOrExit() {
        self::initStore(); // once
        $user = null;
        
        if (OAuthRequestVerifier::requestIsSigned()) {
            try
            {
                $req = new OAuthRequestVerifier();
                $userId = $req->verify();
                if (null != $userId) {
                    $user = Ediary_User::find($userId);
                } else {
                    throw new OAuthException2("No such user.");
                }
            }
            catch (OAuthException2 $e)
            {
                // The request was signed, but failed verification
                header('HTTP/1.1 401 Unauthorized');
                header('WWW-Authenticate: OAuth realm=""');
                header('Content-Type: text/plain; charset=utf8');
                Ediary_Logger::log2($e->getMessage());
                exit($e->getMessage());
            }
        }
        else {
            exit("Not a OAuth request.");
        }
        
        return $user;
    }
    
    private static function exitApp($msg = '') {
       
    }
}