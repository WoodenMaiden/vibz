<?php

require 'Constants.php';

class Database
{

    private $connection;
    /**
     * @var object|null
     */
    public ?object $error = null;

    public function __construct()
    {
        try {
            $this->connection = new PDO(
                Constants::DATABASE_DSN,
                Constants::DATABASE_USER,
                Constants::DATABASE_PASSWORD);

            $this->connection->exec('SET CHARACTER SET utf8');
            $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        } catch (PDOException $e) {
            $this->error = var_export($e, true);
        }
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function insertUser( $name, $email, $passwd){
        $passwd = password_hash($passwd, PASSWORD_BCRYPT);
        $query = $this->connection->prepare('INSERT INTO USER (email, nom, date, status, password) VALUES (:e, :n, NOW(), 0, :p)');

        return $query->execute([
            'n' => $name,
            'e' => $email,
            'p' => $passwd
        ]);
    }

    private function emailExists ($email){
        $query = $this->connection->prepare('SELECT * FROM USER WHERE email = :e');
        return $query->execute([$email]);
    }


    /**
     * @param $email
     * @param $passwd non haché
     * @return false|mixed  la ligne si ça réussit, false sinon
     */
    public function login ($email, $passwd){
        $passwd = password_hash($passwd, PASSWORD_BCRYPT);
        if ($this->emailExists($email)) {
            $query = $this->connection->prepare('SELECT * FROM USER WHERE email = :e');
            $query->execute([$email]);
            $row = $query->fetch();
            if (password_verify($passwd, $row->email))return $row;
            else return false;
        }
        else return false;
    }

}