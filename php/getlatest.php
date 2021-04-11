<?php

require 'Database.php';

$db = new Database();
$obj = new stdClass();
$obj->result = true;
$obj->message = '[' . date("F j, Y, g:i a") . '] : ';
$obj->posts = array(); // tableau associatif <=> objet


if (isset($_POST['n'])){
    $n = $_POST['n'];
    if (is_numeric($n)){
        if ($n > 0) {
            $lignes = $db->getLatest();
            $i =0;
            //TODO chopper le nom à partir de id_user
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
                if (++$i >= $n) break;
            }
        }
        else {
            $obj->result = false;
            $obj->message .= 'n est nul ou negatif ';
        }
    }
    else {
        $obj->result = false;
        $obj->message .= 'n n\'est pas un nombre ';
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