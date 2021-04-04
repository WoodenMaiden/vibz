<?php
require "queries.php";

$obj = new stdClass();
$obj->result = true;

function signup($obj) {
    $credentials = json_decode(file_get_contents('php://input'), true);
//    print_r($credentials);
//    error_log($credentials . '\n', 3,'log');
    if (InsertUser($credentials['pseudo'], $credentials['email'], $credentials['mot_de_passe']) == false){
        $obj->result = false;
//        $obj->message = "";
    }
    return $obj;
}

$obj = signup($obj);



header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);
