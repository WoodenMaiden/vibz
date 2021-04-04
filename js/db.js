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
    let $dataArray = $("#signup").serializeArray();
    let $data = $("#signup").serialize();
    let $msg = $("#msg");
    console.log($dataArray)
    $msg.html("")
    let echec = false


    //on vérifie la validité des données :
    //TODO afficher les erreurs dans une notif
    //est ce que les emails sont les mêmes ?
    if ($dataArray[1]['value'] === $dataArray[2]['value']){
        //sont ils pas trop longs ?
        if ($dataArray[1]['value'].length > 254 || $dataArray[1]['value'].length === 0){
            $msg.html("la longueur de l'email est de plus de 254 caractères ou nulle!").css(CSS_ERROR)
            echec = true
        }
        //sont ils réellement des mails ?
        else if ($dataArray[1]['value'].match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {// source de la regex: https://stackoverflow.com/a/46181
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

    $("#signup").submit(function (event) {
        if (echec) return false //on empêche l'envoi en cas de pb
        $.ajax({
            url: SIGNUP,
            method: "post",
            data: $data,
            dataType: "json"
        }).done(function (data) {//debug
            console.log(JSON.stringify(data));
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