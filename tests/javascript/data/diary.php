<?php
header("Content-type: application/json; charset=utf-8"); 

$data = array(
   		'diary' =>  array(
    		'title' => 'diary_title',
        	'content' => 'diary_content',
        	'id'    => 123,
            'saved_at' => "2011-04-07 13:47:05"),
         'callback' => 'updateId'
);

if (isset($_GET['op'])) {
    switch($_GET['op']) {
        case 'doSave':
            doSave();
            break;
        case 'getDiary':
        	getDiary();
            break;
        default: 
            break;
    }
}

function doSave() {
    global $data;
    if (isset($_GET['badjson'])) {
        echo $data;
    } else if (isset($_GET['haserror'])) {
        $data['error'] = '无法解析服务器返回的数据';
        echo json_encode($data);
    } else {
        echo json_encode($data);
    }
}

function getDiary() {
    global $data;
    unset($data['callback']);
    echo json_encode($data);
}