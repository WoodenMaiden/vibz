<?php
require "Constants.php";



function InsertUser($name, $email, $passwd)
{

    $connexion = new PDO(Constants::DATABASE_DSN, Constants::DATABASE_NAME, Constants::DATABASE_PASSWORD);

    $connexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $date = new Date();

    $passwd = password_hash($passwd, PASSWORD_BCRYPT);

    try {
        $query = $connexion->prepare('INSERT INTO USER (email, nom, date, status, password) VALUES (:email, :name, :date, :status, :passwd)');
        $query->execute(['email' => $email, 'nom' => $name, 'date' => $date, 'status' => 0, 'passwd' => $passwd]);
    }
    catch (PDOException $e){
        echo $e;
        return false;
    }
}
