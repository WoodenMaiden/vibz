/**
 * @author Yann POMIE
 * @file db.js
 */

BASE = "http://vibz.alwaysdata.net/";
SIGNUP = "http://vibz.alwaysdata.net/php/signup.php";

const CSS_ERROR = {
    "color" : "#d70000"
}

/**
 * @description inscrit un utilisateur
 * @return false à tous les coups, si il y a une erreru unmessage est affiché
 */

let signup = () => {
    let $form = $("#signup");
    let $msg = $("#msg");
    $msg.html("")

    $form.submit(function (event) {

        var $dataArray = $form.serializeArray();

        //on vérifie la validité des données :
        //TODO afficher les erreurs dans une notif
        //on vérifie si le pseudo :
        //  - n'est pas vide
        // - ne contient pas d'espaces
        //  - ne contient pas de js
        if (!$dataArray[0]['value'] === "" || !$dataArray[0]['value'].length > 30){
            let matchregex = $dataArray[0]['value'].match(/^[^<][\S\_\-]*[^\/>]/);

            // si la regex donne une chaîne de taille différente
            if (matchregex[0].length !== $dataArray[0]['value'].length){
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
                echec = true
            }
            //sont ils réellement des mails ?
            else if ($dataArray[1]['value'].match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {// source de la regex: https://stackoverflow.com/a/46181, regex provenant du code source de chromium
                $msg.html("le mail n'est pas valide!").css(CSS_ERROR);
                echec = true
            }
        }
        else{
            $msg.html("les emails ne sont pas les mêmes!").css(CSS_ERROR)
            echec = true
        }

        //on vérifie les mots de passe
        if ($dataArray[3]['value'] === $dataArray[4]['value']){
            //sont ils pas trop longs ?
            if ($dataArray[3]['value'].length > 72 || $dataArray[3]['value'].length === 0){
                $msg.html("la longueur du mot de passe est de plus de 72 caractères ou nulle!").css(CSS_ERROR)
                echec = true
            }
        }
        else
        {
            $msg.html("les mots de passe ne sont pas les mêmes!").css(CSS_ERROR)
            echec = true
        }

        $.ajax({
            url: SIGNUP,
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            //contentType : "application/json"
        }).done(function (data) {//debug
            if (data.hasOwnProperty("result")) {
                if (data.result) {
                    window.location.refresh(true)
                } else {
                    console.log(JSON.stringify(data));
                    if (data.hasOwnProperty("message")) {
                        alert(data.message);
                    }
                }
            }
        })
        /*.done(function (data) {
            //on vérifie le résultat
            if (data.hasOwnProperty("result")){
                if (data.result){
                    $msg.html("réussi !");
                    //window.location.reload(true)
                }
                else {

                }
            }
        })*/
        return false; // pour empêcher le refresh de la page
    })
    // changeView("feed")
}



let writepost = () => {

}

let getLatestPosts = (n) => {
    //var query = "SELECT id_post, date, content, id_user FROM POST"
}