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

    private function getConnection()
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
        $query = $this->connection->prepare('SELECT * FROM USER WHERE email = ?');
        $bool = $query->execute([$email]);
        $row = $query->fetch();
        return $bool && ($row->id != null);
    }


    /**
     * @param $email
     * @param $passwd : non hashé
     * @return false|mixed : la ligne si ça réussit, false sinon
     */
    public function login ($email){
        if ($this->emailExists($email)) {
            $query = $this->connection->prepare('SELECT * FROM USER WHERE email = ?');
            $query->execute([$email]);
            $row = $query->fetch();
            return array(
                'id' => $row->id,
                'email' => $row->email,
                'name' => $row->nom,
                'date' => $row->date,
                'status' => $row->status,
                'password' => $row->password
            );
        }
        else return false;
    }
}