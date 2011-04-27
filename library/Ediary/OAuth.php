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
}