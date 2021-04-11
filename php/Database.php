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

    /**
     * @return array : array de lignes
     */
    public function getLatest (){
        $query = $this->connection->prepare('SELECT * FROM POST ');
        $query->execute();
        return $query->fetchAll();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getUserById($id){
        $query = $this->connection->prepare('SELECT * FROM USER WHERE id = ?');
        $query->execute([$id]);
        return $query->fetch();
    }

    /**
     * @param $post integer
     * @return bool
     */
    public function like($post){
        $query = $this->connection->prepare('UPDATE POST SET likes = likes + 1 WHERE id_post = ?');
        return $query->execute([$post]);
    }

    /**
     * @param $post integer
     * @return bool
     */
    public function unlike($post){
        $query = $this->connection->prepare('UPDATE POST SET likes = likes - 1 WHERE id_post = ?');
        return $query->execute([$post]);
    }

    /**
     * @param $msg
     * @param $id
     * @return bool
     */
    public function write ($msg, $id){
        $query = $this->connection->prepare('INSERT INTO POST (date, content, id_user, likes) VALUES (NOW(), :c, :i, 0)');
        return $query->execute([
           'c' => $msg,
           'i' => $id
        ]);
    }

    /**
     * @param $postid
     * @return mixed
     */

    public function getUserFromPost ($postid){
        $query = $this->connection->prepare('SELECT * FROM USER WHERE id IN 
                                                    (SELECT id_user FROM POST WHERE id_post = ?)');
        $query->execute([$postid]);
        return $query->fetch();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getUserFromId ($id){
        $query = $this->connection->prepare('SELECT * FROM USER WHERE id = ?');
        $query->execute([$id]);
        return $query->fetch();
    }

    public function getPostsById ($id) {
        $query = $this->connection->prepare('SELECT * FROM POST WHERE id_user = ?');
        $query->execute([$id]);
        return $query->fetchAll();
    }
}