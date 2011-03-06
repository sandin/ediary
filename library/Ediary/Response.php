<?php
class Ediary_Response
{
    public static function send($data) {
        echo json_encode($data);
    }
}