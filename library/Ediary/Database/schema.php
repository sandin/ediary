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

DROP TABLE IF EXISTS $imdb->users;
CREATE TABLE $imdb->users (
  id		bigint(20)       unsigned NOT NULL auto_increment,
  email     varchar(100)     NOT NULL default '', 
  username 	varchar(50)      NOT NULL default '',
  password	varchar(64)      NOT NULL default '',
  security_code	varchar(32)  NOT NULL default '',
  created_at 	datetime     NOT NULL default '0000-00-00 00:00:00',
  last_logined	datetime     NOT NULL default '0000-00-00 00:00:00',
  account  	 int(11)         NOT NULL default '0',
  photo      varchar(100)    NOT NULL default '',

  PRIMARY KEY (id),
  UNIQUE KEY user_email (email)
) $imdb->tableSet;

DROP TABLE IF EXISTS $imdb->diarys;
CREATE TABLE $imdb->diarys (
  id		bigint(20)      unsigned NOT NULL auto_increment,
  title	    text            NOT NULL,
  content	longtext        NOT NULL,
  weather 	varchar(255)    NOT NULL default '',
  mood		varchar(11)     NOT NULL default '',
  status	varchar(20)     NOT NULL default 'archive',
  created_at datetime       NOT NULL default '0000-00-00 00:00:00',
  saved_at	 datetime        NOT NULL default '0000-00-00 00:00:00',

  user_id	   bigint(20)      unsigned NOT NULL default '0',
  journal_id   bigint(20)      unsigned NOT NULL default '0',

  PRIMARY KEY (id),
  KEY diary_author (user_id),
  KEY journal (journal_id)
) $imdb->tableSet;

DROP TABLE IF EXISTS $imdb->journals;
CREATE TABLE $imdb->journals (
  id      	  bigint(20)      unsigned NOT NULL auto_increment,
  title       varchar(200)    NOT NULL default '',
  created_at  datetime        NOT NULL default '0000-00-00 00:00:00',

  user_id	  bigint(20)      unsigned NOT NULL default '0',

  PRIMARY KEY (id),
  KEY journal_owner (user_id)
) $imdb->tableSet;

EOF;

//echo $installQuery;

?>
