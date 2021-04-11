<?php

require 'Database.php';

$db = new Database();
$obj = new stdClass();
$obj->result = true;
$obj->message = '[' . date("F j, Y, g:i a") . '] : ';
$obj->posts = array(); // tableau associatif <=> objet

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $lignes = $db->getPostsById($id);

    foreach ($lignes as &$val){
        $row = $db->getUserById($val->id_user);
        array_push($obj->posts, array(
            "id_post" => $val->id_post,
            "name" => $row->nom,
            "date" => $val->date,
            "content" => $val->content,
            "likes" => $val->likes,
            "id_user" => $val->id_user
        ));
    }
}
else {
    $obj->result = false;
    $obj->message .= 'erreur lors du passage de post ';
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($obj);