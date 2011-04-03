<?php
class Ediary_Formator
{
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
    
    public static function getDateAndWeek($date = null) {
        $zDate = new Zend_Date();
        $zDate->set(isset($date) ? $date : time());
        return $zDate->get(Zend_Date::YEAR) . '年'
               . $zDate->get(Zend_Date::MONTH_SHORT) . '月'
               . $zDate->get(Zend_Date::DAY_SHORT) . '日 '
               . $zDate->get(Zend_Date::WEEKDAY);
    }
    
    /**
     * Validator for : 0000-00-00
     * @return Zend_Validate_Regex
     */
    public static function getDateValidate() {
        return new Zend_Validate_Regex(array(
        	'pattern' => '/^\d{4}-\d{2}-\d{2}$/'));
    }
}