<?php
class Ediary_Metadata_User extends Ediary_Metadata
{
    /**
     * @param String $user_id
     */
    public function __construct($user_id) {
        parent::__construct('usermeta', 'user_id', $user_id);
    }
}