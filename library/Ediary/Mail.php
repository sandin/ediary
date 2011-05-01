<?php
class Ediary_Mail
{
    const SENDMAIL = 0;
    const SMTP = 1; 
    
    /**
     * 获取邮件配置
     * 
     * @param String $section like "stmp", "sendmail"
     * @return mixed(Zend_Config_Ini|NULL)
     */
    public static function getConfig($section = null) {
        $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/mail.ini',
                                      APPLICATION_ENV);
        if ($section != null) {
            return $config->get($section, null);
        }
        return $config;
    }
    
    /**
     * Get Zend Mail Transport
     * 
     * @param int $type see Ediary_Mail::XXXX
     * @return Zend_Mail_Transport_Abstract
     */
    public static function getTransport($type) {
        $config = self::getConfig();
        
        $transport;
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
    
   /**
     * Convert Zend_Mail to String
     * 
     * @param Zend_Mail $mail
     * @return String 
     */
    public static function asString($mail) {
        $to = $mail->getRecipients();
        return 'Mail [ From :'  . $mail->getFrom() 
                . ', To :'  . $to[0] 
                . ']';
    }
}