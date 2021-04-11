<?php

require 'Database.php';

$db = new Database();
$obj = new stdClass();
$obj->result = true;
$obj->message = '[' . date("F j, Y, g:i a") . '] : ';

if(isset($_POST['like']) && isset($_POST['postid'])) {
    $islike = $_POST['like'];
    $postid = $_POST['postid'];

    if ($islike === "true"){
        $obj->message .= 'type like ' . gettype($islike) . ', type postid ' .gettype($postid);
        if (!$db->like($postid)) {
            $obj->result = false;
            $obj->message .= 'error like() ';
        }
    }
    else {
        $obj->message .= 'type like ' . gettype($islike) . ', type postid ' .gettype($postid);
        if (!$db->unlike($postid)){
            $obj->result = false;
            $obj->message .= 'error unlike() ';
        }
    }
}
else {
    $obj->result = false;
    $obj->message .= 'erreur avec post ';
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($obj);