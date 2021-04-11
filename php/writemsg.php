<?php
require 'Database.php';

session_start();

$obj = new stdClass();
$db = new Database();
$obj->result = true;
$obj->message = '[' . date("F j, Y, g:i a") . '] : ';

if (isset($_POST['msg']) && isset($_SESSION['id'])){
    $msg = $_POST['msg'];
    $idusr = $_SESSION['id'];
    if(!$db->write($msg, $idusr)) {
        $obj->result = false;
        $obj->message .= 'error write() ';
    }

}
else{
    $obj->result = false;
    $obj->message .= 'erreur avec post : $_POST[\'msg\'] = ' . $_POST['msg'] . ', $_SESSION[\'id\'] = ' . $_SESSION['id'];
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($obj);