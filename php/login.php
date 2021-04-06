<?php
require "./Database.php";

session_start();

$obj = new stdClass();
$obj->result = true;
$obj->trace = var_export($_POST, true);
$obj->message = '[' . date("F j, Y, g:i a") . ']';

$db = new Database();
if (!$db->error) {
    if (isset($_POST['email']) && isset($_POST['mot_de_passe'])) {
        if (($row = $db->login($_POST['email'], $_POST['mot_de_passe'])) != false){
            $obj->result = false;
            $_SESSION['id'] = $row->id;
            $_SESSION['name'] = $row->name;
            $_SESSION['email'] = $row->email;
            $_SESSION['status'] = $row->status;
        }
        else {
            $obj->result = false;
            $obj->message = $obj->message . ' L\'utilisateur n\'a pas été trouvé';
        }
    }
    else {
        $obj->result = false;
        $obj->message = $obj->message . ' Problème lors du transfert de données ';
    }

}
else {
    $obj->result = false;
    $obj->message = $obj->message . ' Database error : ' . $db->error;
}


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($obj);