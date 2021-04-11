<?php
require "./Database.php";

session_start();

$obj = new stdClass();
$obj->result = true;
$obj->trace = var_export($_POST, true);
$obj->message = '[' . date("F j, Y, g:i a") . '] post :' . $_POST['log_email'] . ' ' . $_POST['log_mot_de_passe'] .' // ';


$db = new Database();
if (!$db->error) {
    if (isset($_POST['log_email']) && isset($_POST['log_mot_de_passe'])) {
        $row = $db->login($_POST['log_email']);
        if ($row != false){
            $_SESSION['id'] = $row['id'];
            $_SESSION['date'] = $row['date'];
            $_SESSION['name'] = $row['name'];
            $_SESSION['email'] = $row['email'];
            $_SESSION['status'] = $row['status'];

            $hash = $row['password'];

            if ($hash == null){
                $obj->message = $obj->message . ' Erreur lors de la requete sql ' . var_export($row, true);
                $obj->result = false;
            }
            else if (!password_verify($_POST['log_mot_de_passe'], $hash)) {
                $obj->result = false;
                $obj->message = $obj->message . ' Mot de passe erronné ' . /*var_export($row, true) .*/ ' ' . $_POST['mot_de_passe'] . ' ' . $hash;
            }
        }
        else {
            $obj->result = false;
            $obj->message = $obj->message . ' L\'utilisateur n\'a pas été trouvé ' . var_export($row, true);
        }
    }
    else {
        $obj->result = false;
        $obj->message = $obj->message . ' Problème lors du transfert de données ' . var_export($_POST, true);
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