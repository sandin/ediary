<?php
class Ediary_Mail
{
    const SENDMAIL = 0;
    const SMTP = 1; 
    
    /**
     * 获取邮件配置
     * 
     * @param String $section stmp/sendmail
     * @return Zend_Config_Ini or NULL
     */
    public static function getConfig($section = null) {
        $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/mail.ini',
                                      APPLICATION_ENV);
        if ($section != null) {
            return $config->get($section, null);
        }
    }
    
    public static function getTranspont($type) {
        $config = self::getConfig();
        
        $transport = null;
        switch ($type) {
            case self::SMTP:
                $config = $config->get("smtp");
                $transport = new Zend_Mail_Transport_Smtp($config->host,
                                          $config->config->toArray());
                break;
                
            case self::SENDMAIL :
            default:
                $transport = new Zend_Mail_Transport_Sendmail();
                break;
        }
        
        return $transport;
    }
}