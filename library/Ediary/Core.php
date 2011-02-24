<?php

class Ediary_Core
{

	/**
	 * 非正常原因退出程序
	 *
	 * @param String $msg 结束原因
	 */
	public static function exitApp($msg = '') {
		self::goUrl('/error/error/');
	}

	public static function goUrl($url) {
		header("location: " . $url);
	}

}