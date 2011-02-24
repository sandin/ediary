<?php
class Ediary_User
{
	private $_table = null;
	
	public function __construct() {
		$this->_table =  new Zend_Db_Table('user');
	}
	
	public function findById($userId) {
		$this->_table->find($userId);
		return new Ediary_Object_user($userInfo);
	}
	
	public function findByName($userName) {
	}
	
	public function isExists($userName) {
	}
	
	public function insert($userInfo){}
	
	public function delete($userId){}
	
	public function update($userId){}
	
}
