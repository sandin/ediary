<?php
class Ediary_Date
{
    const PHP_SQL_DATE_FORMAT = 'Y-m-d';
    const PHP_ZH_DATE_FORMAT = 'Y年n月j日';
    const ISO_SQL_DATE_FROMAT = 'YYYY-MM-dd';
    const ISO_ZH_DATE_FORMAT = 'YYYY年MM月dd日';
    
    public static $weekMap = array("星期天", "星期一", "星期二", "星期三"
     							  ,"星期四", "星期五", "星期六");
    
    /**
     * LocalizedToNormalized filter will return a array, so
     * 
     * @param array $filter_input_date
     * 	array {'year' => '0000','month' => '00','day' => '00' }
     * @return string
     */
    public static function LocalizedDate($filter_input_date, $endOfDay = false) {
        $year = $filter_input_date['year'];
        $month = $filter_input_date['month'];
        $day = $filter_input_date['day'];
        return self::addTime($year . '-' . $month . '-' . $day, $endOfDay);
    }
    
    /**
     * append a time of date, like: 0000-00-00 -> 0000-00-00 00:00:00
     * @param boolean $endOfDay  23:59 or 00:00 
     * @return string
     */
    public static function addTime($date, $endOfDay = false) {
        return $date . ( ($endOfDay) ? ' 23:59:59' : ' 00:00:00' );
    }
    
    /**
     * Remove the time, Convert '0000-00-00 00:00:00' to '0000-00-00'
     * @param String $stringDate '0000-00-00 00:00:00'
     */
    public static function stripTime($stringDate) {
        $tmp = explode(' ', $stringDate);
        return $tmp[0];
    }
    
    /**
     * 0000年00月00日 星期几
     * 
     * @deprecated use Ediary_Fomater::dayAndWeek instead, faster
     * @param long $date null表示今天
     * @return string
     */
    public static function getDateAndWeek($date = null) {
        $zDate = new Zend_Date();
        $zDate->set(isset($date) ? $date : time());
        return $zDate->get(Zend_Date::YEAR) . '年'
             . $zDate->get(Zend_Date::MONTH_SHORT) . '月'
             . $zDate->get(Zend_Date::DAY_SHORT) . '日 '
             . $zDate->get(Zend_Date::WEEKDAY);
    }
    
    /**
     * 格式化: 0000年00月00日 星期几
     * 
     * @param long $date null表示今天
     * @return string
     */
    public static function dayAndWeek($date = null) {
        $date = (isset($date)) ? $date : time();
        $week = self::$weekMap[ date('w', $date) ];
        $day = date(self::PHP_ZH_DATE_FORMAT, $date); 
        return $day . ' ' . $week;
    }
    
    /**
     * Validator for : 0000-00-00
     * @return Zend_Validate_Regex
     */
    public static function getDateValidate() {
        return new Zend_Validate_Regex(array(
        	'pattern' => '/^\d{4}-\d{2}-\d{2}$/'));
    }
    
    public static function lastWeek($timezone = null) {
        $zDate = new Zend_Date();
        $zDate->sub(1, Zend_Date::WEEK); // sub a week
        //$zDate->setOptions(array('format_type' => 'php'));
        if ($timezone == 'RPC') {
            return $zDate->toString(self::ISO_ZH_DATE_FORMAT);
        }
        return $zDate->toString(self::ISO_SQL_DATE_FROMAT);
    }
    
    /**
     * Get today date, like '0000-00-00'
     * @return string
     */
    public static function today() {
        return date('Y-m-d', time());
    }
}