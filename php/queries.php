<?php
require "Constants.php";

$connexion = new PDO(Constants::DATABASE_DSN, Constants::DATABASE_NAME, Constants::DATABASE_HOST);

$this->connexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$this->connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


if ($_POST['name'] == 'Inscription') {
    $name = $_POST['pseudo'];
    $email = $_POST['email'];
    $passwd = $_POST['mot_de_passe'];
    $date = new Date();

    $passwd = password_hash($passwd, PASSWORD_BCRYPT);

    $query = $this->connexion->prepare('INSERT INTO USER (email, nom, date, status, password) VALUES (:email, :name, :date, :status, :passwd)');
    $query->execute(['email' => $email, 'nom' => $name, 'date'=>$date, 'status'=> 0, 'passwd' => $passwd]);
}