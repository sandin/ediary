<?php
class Ediary_Backup_RSS implements Ediary_Backup_Interface
{
    private $_templete;

    public function __constracut() {

    }
    
    /**
     * TODO: 完成RSS导入
     * @see Ediary_Backup_Interface::import()
     */
    public function import($import) {} 
    
    /**
     * Export 
     * 
     * @param array $args
     * @return string
     */
    public function export($args = array()) {
        $default = array(
            'user' => -1,     // user id
            'max'  => 200     // max num of item
        );
        $args = array_merge($default, $args);
        
        $user = Ediary_User::find($args['user']);
        if (null != $user) {
            return self::createXML($user, $args['max']);
        }
    }
    
    /**
     * Create atom XML
     * 
     * @param Ediary_User $user
     * @return string xml output
     */
    private static function createXML($user, $max) {
        // 用户名可能为空值
        $user->username = ("" != $user->username) ? $user->username : $user->email;
        
        $feed = new Zend_Feed_Writer_Feed;
        $feed->setTitle($user->username . ' \'s Blog');
        $feed->setLink('http://www.eriji.com/user/' . $user->id);
        $feed->setFeedLink('http://www.eriji.com/feed/diarys/user/' . $user->id, 'atom');
        $feed->setGenerator('宜日记', '1.0', 'http://www.eriji.com');
        $feed->addAuthor(array(
    		'name'  => $user->email,
    		'email' => $user->email,
    		'uri'   => 'http://www.eriji.com/user/' . $user->id
        ));
        $feed->setDateModified(time());
        $feed->addHub('http://pubsubhubbub.appspot.com/');
        
        $diarys = Ediary_Diary::getDiarys($user->id, $max);
        if (null != $diarys && count($diarys) > 0) {
            foreach ($diarys as $diary) {
                $feed->addEntry(self::createItem($feed, $diary, $user));
            }
        }
        return $feed->export('atom');
    }
    
    /**
     * Add one or more entries. Note that entries must
     * be manually added once created.
     */
    private static function createItem($feed, $item, $author) {
        $entry = $feed->createEntry();
        $entry->setTitle($item['title']);
        $entry->setLink('http://www.eriji.com');
        $entry->addAuthor(array(
    		'name'  => $author->email,
    		'email' => $author->email,
    		'uri'   => 'http://www.eriji.com/user',
        ));
        $entry->setDateModified(time());
        $entry->setDateCreated(time());
        //$entry->setDescription(wordwrap($item['content'], 100));
        $entry->setDescription('content');
        $entry->setContent('<![CDATA['. $item['content'] . ']]>' );
        
        return $entry;
    }

}