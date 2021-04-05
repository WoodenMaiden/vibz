<?php/*
require "Constants.php";



function InsertUser($name, $email, $passwd)
{

    $db = new Database();
    $connect = $db->getConnection();*/
   /* $connexion = new PDO(Constants::DATABASE_DSN, Constants::DATABASE_USER, Constants::DATABASE_PASSWORD);

    $connexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
*/
/*
    $date = new Date();

    $passwd = password_hash($passwd, PASSWORD_BCRYPT);

    try {
        $connect
        'INSERT INTO USER (email, nom, date, status, password) VALUES (:email, :name, :date, :status, :passwd)';



  //      $query = $connexion->prepare('INSERT INTO USER (email, nom, date, status, password) VALUES (:email, :name, :date, :status, :passwd)');
    //    $query->execute(['email' => $email, 'nom' => $name, 'date' => $date, 'status' => 0, 'passwd' => $passwd]);
    }
    catch (Exception $e){
        error_log($e->getMessage(), 3 ,"log");
        echo $e;
        return false;
    }
}*/
