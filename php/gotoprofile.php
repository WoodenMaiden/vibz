<?php
require 'Database.php';

session_start();

$obj = new stdClass();
$db = new Database();
$obj->result = true;
$obj->message = '[' . date("F j, Y, g:i a") . '] : ';

if (isset($_POST['id_post'])){ // dans le cas ou on prend un profil depuis un post
    $row = $db->getUserFromPost($_POST['id_post']);
    if ($row != null) {
        $obj->data = array(
            "id" => $row->id,
            "nom" => $row->nom,
            "date" => $row->date,
            "status" => $row->status
        );
    }
    else{
        $obj->result = false;
        $obj->message .= 'erreur getUserFromPost()';
    }
}
elseif (isset($_POST['me']) && isset($_SESSION['id'])) { // dans le cas ou on regarde son profil
    $row = $db->getUserFromid($_SESSION['id']);
    if ($row != null) {
        $obj->data = array(
            "id" => $row->id,
            "nom" => $row->nom,
            "date" => $row->date,
            "status" => $row->status
        );
    }
    else{
        $obj->result = false;
        $obj->message .= 'erreur getUserFromPost()';
    }
}
else {
    $obj->result = false;
    $obj->message .= 'erreur lors de la requete avec $_POST ';
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($obj);