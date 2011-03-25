<?php
header("Content-type: application/json; charset=utf-8"); 


if (isset($_GET['op'])) {
    switch($_GET['op']) {
        case 'doSave':
            doSave();
            break;
        default: 
            break;
    }
}

function doSave() {
    $diary = array(
   		'diary' =>  array(
    		'title' => 'diary_title',
        	'content' => 'diary_content',
        	'id'    => 123),
         'callback' => 'updateId'
    );
    if (isset($_GET['badjson'])) {
        echo $diary;
    } else if (isset($_GET['haserror'])) {
        $diary['error'] = '无法解析服务器返回的数据';
        echo json_encode($diary);
    } else {
        echo json_encode($diary);
    }
}