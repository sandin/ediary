<?php
class Ediary_Paginator
{
    /**
     * Get a Zend_Paginator
     * 
     * @param String $table like {diary} will add prefix
     * @param mixed[String|Array] $where Zend_Db_Select where
     * @param mixed[String|Array] $bind Zend_Db_Select bind
     * @param int $currentPageNumber Zend_Paginator currentPageNumber
     * @param int $itemCountPerPage Zend_Paginator itemCountPerPage
     * @throws Ediary_Exception when $currentPageNumber is not a number
     * @return Zend_Paginator 
     */
    public static function factory($table, $where, $bind, $orderBy = null, $currentPageNumber = 1, $itemCountPerPage = 10) {
        if (!is_numeric($currentPageNumber)) {
            throw new Ediary_Exception(__METHOD__ . ' except $currentPageNumber is a number.');
        }
        
        $db = Ediary_Db::getInstance();
        $select = $db->select()
                     ->from(Ediary_Db::prefixTables($table));
        if (is_array($where)) {
            for ($i = 0, $l = count($where); $i < $l; $i++) {
                $select->where($where[$i], (isset($bind[$i])) ? $bind[$i] : '');
            }
        } else {
            $select->where($where, $bind);
        }             
        if (isset($orderBy)) {
            $select->order($orderBy);
        }
        //var_dump($select->__toString());
                     
        $adapter = new Zend_Paginator_Adapter_DbSelect($select);
        $paginator = new Zend_Paginator($adapter);
        $paginator->setCurrentPageNumber((int) $currentPageNumber)
                  ->setItemCountPerPage($itemCountPerPage);
        //foreach ($paginator as $item) { var_dump($item); }
        return $paginator;
    }
}