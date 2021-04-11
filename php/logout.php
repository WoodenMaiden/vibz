<?php
session_start();

$_SESSION = array();
if(ini_get("session.use_cookies")){
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
session_destroy();

//unset($_POST['id']);
//unset($_POST['date']);
//unset($_POST['name']);
//unset($_POST['email']);
//unset($_POST['status']);


$obj = new stdClass();
$obj->result = true;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($obj);