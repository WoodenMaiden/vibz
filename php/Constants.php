<?php

//enum
abstract class Constants
{
    const DATABASE_NAME = 'vibz_mysql';
    const DATABASE_HOST = 'mysql-vibz.alwaysdata.net';
    const DATABASE_USER = 'vibz';
    const DATABASE_PASSWORD = 'D!08rand0';
    const DATABASE_DSN = 'mysql:dbname=' . self::DATABASE_NAME . ';host=' . self::DATABASE_HOST;
}