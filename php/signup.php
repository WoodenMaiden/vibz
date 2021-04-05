<?php
//require 'queries.php';
require 'Database.php';

$obj = new stdClass();
$obj->result = true;
$obj->trace = var_export($_POST, true);
$obj->message = '[' . date("F j, Y, g:i a") . ']';

$db = new Database();
if (!$db->error) {

    if (isset($_POST['pseudo']) && isset($_POST['email']) && isset($_POST['mot_de_passe'])) {

        if ($db->insertUser($_POST['pseudo'], $_POST['email'], $_POST['mot_de_passe']) == false){
            $obj->result = false;
            $obj->message = $obj->message . "Une erreur à eu lieu insertUser()";
        }
    }
    else {
        $obj->result = false;
    }

} else {
    $obj->result = false;
    $obj->message = $obj->message . ". Database error: " . $db->error;
}



header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($obj);
