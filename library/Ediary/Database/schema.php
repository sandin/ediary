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
  KEY user_email (user_email)
) $imdb->tableSet;

DROP TABLE IF EXISTS $imdb->diarys;
CREATE TABLE $imdb->diarys (
  id		bigint(20)      unsigned NOT NULL auto_increment,
  date		datetime        NOT NULL default '0000-00-00 00:00:00',
  weather 	varchar(255)    NOT NULL default '',
  feeling	varchar(11)     NOT NULL default '',
  title	    text            NOT NULL,
  content	longtext        NOT NULL,
  status	varchar(20)     NOT NULL default 'archive',

  user_id	bigint(20)      unsigned NOT NULL default '0',
  book_id   bigint(20)      unsigned NOT NULL default '0',

  PRIMARY KEY (id),
  KEY diary_author (user_id),
  KEY diary_book (book_id)
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
