<?php
interface Ediary_Backup_Interface
{
    function import($import);
    function export($args = array());
}