<?php

class Ediary_Object_User {
	
	private $name;
	
	public function __construct($userData) {
		$this->name = $userData->name;
	}
	
	public function getName() {
		return $this->name;
	}
}