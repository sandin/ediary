<?php
abstract class Ediary_Notification_Abstract
{
    protected static $db;
    
    public function __construct() {
        self::$db = Ediary_Db::getInstance();
    }

    /**
     * 获得需要提供的用户列表(订阅了当前小时提醒, 并且今天又还没写日记的用户)
     * 
     * @return Array<Array> inner array, (user_id, email)
     */
    protected function getSendList() {
        $orderList = self::getNoticeList(); // at this hour
        //$orderList = array_keys($orderList);
        
       	$noNeenToNotice = self::getWhoHasWrittenDiary(); // today
       	$needToNotice = array_diff($orderList, $noNeenToNotice);
        return $needToNotice;
    }

    /**
     * 获取所有今天已写日记的用户列表
     * 
     * @param String $date 0000-00-00
     * @return Array<String> a list of user id
     */
    public static function getWhoHasWrittenDiary( $date = null ) {
        $date = isset($date) ? $date : Ediary_Db::today();
        
        $db = Ediary_Db::getInstance();
        return  $db->fetchCol('SELECT user_id FROM {diarys} '
        . ' WHERE created_date = ?', $date);
    }
    
 /**
     * 获得订阅了某一整点通知的用户列表
     * 
     * @param int $hour 0~23, like date('G', time()), 空值表示当前时刻
     * @return Array, array( 'uid' => 'email', ...);
     */
    public static function getNoticeList($hour = null)
    {
        $hour = (isset($hour)) ? strval(intval($hour)) : date('G', time());
        
        $db = Ediary_Db::getInstance();
        $select = $db->select();
        $select->from(array('m' => Ediary_Db::prefix("usermeta")), array())
               ->join(array('u' => Ediary_Db::prefix("users")),
                            'm.user_id = u.id', array('id', 'email'))
               ->where('m.meta_key = ?', Ediary_Metadata_User::NOTICE)
               ->where('m.meta_value = ?', intval($hour));
                
        //var_dump($select->__toString());
        return $db->fetchPairs($select);
    }

    
}