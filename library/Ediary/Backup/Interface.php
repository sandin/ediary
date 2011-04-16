<?php
interface Ediary_Backup_Interface
{
    function import($import);
    static function export($args);
}