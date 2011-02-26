<?php

/* DEBUG MOCK
$imdb = new stdClass();
$imdb->dbname = 'ediary';
$imdb->users = 'user';
$imdb->diarys = 'diary';
$imdb->books = 'book';

$imdb->charset_name = 'utf8';
$imdb->collation_name = 'utf8_general_ci';
$imdb->tableSet = ' CHARACTER SET ' . $imdb->charset_name 
                . ' COLLATE ' . $imdb->collation_name;
*/

//global $imdb;

$query = <<<EOF

use $imdb->dbname;

DROP TABLE IF EXISTS $imdb->users;
CREATE TABLE $imdb->users (
  user_id		bigint(20)      unsigned NOT NULL auto_increment,
  user_email    varchar(100)    NOT NULL default '', 
  user_name 	varchar(50)     NOT NULL default '',
  user_pass		varchar(64)     NOT NULL default '',
  user_security	varchar(32)     NOT NULL default '',
  user_created 	datetime        NOT NULL default '0000-00-00 00:00:00',
  user_lasttime	datetime        NOT NULL default '0000-00-00 00:00:00',
  user_account  int(11)         NOT NULL default '0',
  user_pic      varchar(100)    NOT NULL default '',

  PRIMARY KEY (user_id),
  KEY user_name (user_name)
) $imdb->tableSet;

DROP TABLE IF EXISTS $imdb->diarys;
CREATE TABLE $imdb->diarys (
  diary_id		bigint(20)      unsigned NOT NULL auto_increment,
  diary_date	datetime        NOT NULL default '0000-00-00 00:00:00',
  diary_weather varchar(255)    NOT NULL default '',
  diary_mood    varchar(11)     NOT NULL default '',
  diary_title   text            NOT NULL,
  diary_content longtext        NOT NULL,
  diary_status  varchar(20)     NOT NULL default 'archive',

  diary_author	bigint(20)      unsigned NOT NULL default '0',
  diary_book    bigint(20)      unsigned NOT NULL default '0',

  PRIMARY KEY (diary_id),
  KEY diary_author (diary_author),
  KEY diary_book (diary_book)
) $imdb->tableSet;

DROP TABLE IF EXISTS $imdb->books;
CREATE TABLE $imdb->books (
  book_id       bigint(20)      unsigned NOT NULL auto_increment,
  book_name     varchar(200)    NOT NULL default '',
  book_created  datetime        NOT NULL default '0000-00-00 00:00:00',

  book_owner	bigint(20)      unsigned NOT NULL default '0',

  PRIMARY KEY (book_id),
  KEY book_owner (book_owner)
) $imdb->tableSet;

EOF;

//echo $installQuery;

?>
