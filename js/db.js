/**
 * @author Yann POMIE
 * @file db.js
 */

// import {changeView} from './util.js';

const BASE = "http://vibz.alwaysdata.net/";
const SIGNUP = BASE + "php/signup.php";
const LOGIN = BASE + "php/login.php";

const CSS_ERROR = {
    "color" : "#d70000"
}

/**
 * @description inscrit un utilisateur
 * @return rien, si il y a une erreur un message est affiché sinon on va sur le feed
 */

let signup = () => {
    let $form = $("#signup");
    let $msg = $("#msg");
    $msg.html("")
    let success = true;

    $form.submit(function (event) {

        let $dataArray = $form.serializeArray();

        //on vérifie la validité des données :
        //TODO afficher les erreurs dans une notif
        //on vérifie si le pseudo :
        //  - n'est pas vide
        // - ne contient pas d'espaces
        //  - ne contient pas de js

        if ($dataArray[0]['value'].length > 0 || !$dataArray[0]['value'].length > 30){
            let matchspaces = $dataArray[0]['value'].match(/[^\S]/g); //on verifie si il y a des espaces
            let matchscript = $dataArray[0]['value'].match(/<+.*\/*>*<*\/+>+/g); // on vérifie si il n'y a pas de html

            if (matchspaces != null) {
                $msg.html("Pas d'espaces !").css(CSS_ERROR);
                return false;
            }

            if (matchscript != null){
                $msg.html("Bien tenté :^)").css(CSS_ERROR);
                return false;
            }

        }
        else {
            $msg.html("la longueur du pseudo est de plus de 30 caractères ou nulle!").css(CSS_ERROR);
            return false;
        }

        //est ce que les emails sont les mêmes ?
        if ($dataArray[1]['value'] === $dataArray[2]['value']){
            //sont ils pas trop longs ?
            if ($dataArray[1]['value'].length > 254 || $dataArray[1]['value'].length === 0){
                $msg.html("la longueur de l'email est de plus de 254 caractères ou nulle!").css(CSS_ERROR)
                return false;
            }
            //sont ils réellement des mails ?
            else if ($dataArray[1]['value'].match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {// source de la regex: https://stackoverflow.com/a/46181, regex provenant du code source de chromium
                $msg.html("le mail n'est pas valide!").css(CSS_ERROR);
                return false;
            }
        }
        else{
            $msg.html("les emails ne sont pas les mêmes!").css(CSS_ERROR)
            return false;
        }

        //on vérifie les mots de passe
        if ($dataArray[3]['value'] === $dataArray[4]['value']){
            //sont ils pas trop longs ?
            if ($dataArray[3]['value'].length > 60 || $dataArray[3]['value'].length === 0){
                $msg.html("la longueur du mot de passe est de plus de 72 caractères ou nulle!").css(CSS_ERROR)
                return false;
            }
        }
        else
        {
            $msg.html("les mots de passe ne sont pas les mêmes!").css(CSS_ERROR)
            return false;
        }

        $.ajax({
            url: SIGNUP,
            method: "POST",
            data: $(this).serialize(),
            dataType: "json"

        }).done(function (data) {
            if (data.hasOwnProperty("result")) {
                if (data.result) {
                    window.location.refresh(true)
                } else {
                    console.log(JSON.stringify(data));
                    if (data.hasOwnProperty("message")) {
                        $msg.html(data.message);
                    }
                    success = false;
                }
            }
        })
        // $msg.fadeOut(5000);
        return false; // pour empêcher le refresh de la page
    })
    // if (success) changeView("feed");
}


/**
 *  @description  connecte un utilisateur à la bd
 *  @return rien, si il y a une erreur un message est affiché sinon on va sur le feed
 */

let login = () => {
    let $form = $("#login");
    let $msg = $("#msg");
    $msg.html("");
    let success = true;

    $form.submit(function () {
        let $dataArray = $form.serializeArray();
        // on vérifie si rien n'est vide ou hors valeurs
        if ($dataArray[0]['value'].length > 254  || $dataArray[0]['value'].length === 0){
            $msg.html("la longueur du mail est de plus de 30 caractères ou nulle!").css(CSS_ERROR);
            return false;
        }

        //c'est bien un mail ?
        if ($dataArray[0]['value'].match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {// source de la regex: https://stackoverflow.com/a/46181, regex provenant du code source de chromium
            $msg.html("le mail n'est pas valide!").css(CSS_ERROR);
            return false;
        }

        if ($dataArray[1]['value'].length > 60 || $dataArray[1]['value'].length === 0) {
            $msg.html("la longueur du mot de passe est de plus de 72 caractères ou nulle!").css(CSS_ERROR)
            return false;
        }
        console.log($dataArray);


        $.ajax({
            url : LOGIN,
            method: "POST",
            data: $(this).serialize(),
            dataType: "json"

        })
        .done(function (data) {
            console.log("requete envoyée!");
            if (data.hasOwnProperty("result") && data.hasOwnProperty("message")) {
                if (data.result == true) {
                    window.location.refresh(true);
                    console.log("connextion réussie");
                } else {
                    success = data.result;
                    console.log("connextion echouée");
                    console.log(data);
                }
            }

        })
        .fail( function () {
            console.log("erreur");
        })
        return false;
    })
    // if (success) changeView("feed");
}



let writepost = () => {

}

let getLatestPosts = (n) => {
    //var query = "SELECT id_post, date, content, id_user FROM POST"
}