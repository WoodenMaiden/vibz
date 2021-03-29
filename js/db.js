/**
 * @author Yann POMIE
 * @file db.js
 */

const SIGNUP = ""

const CSS_ERROR = {
    "color" : "#d70000"
}

let signup = () => {
    let $data = $("#signup").serializeArray();
    console.log($data)
    $("#msg").html("")
    let echec = false


    //on vérifie la validité des données :
    //TODO afficher les erreurs dans ue notif
    //est ce que les emails sont les mêmes ?
    if ($data[1]['value'] === $data[2]['value']){
        //sont ils pas trop longs ?
        if ($data[1]['value'].length > 254 || $data[1]['value'].length === 0){
            $("#msg").html("la longueur de l'email est de plus de 254 caractères ou nulle!").css(CSS_ERROR)
            echec = true
        }
        //sont ils réellement des mails ?
        else if ($data[1]['value'].match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {// source de la regex: https://stackoverflow.com/a/46181
            $("#msg").html("le mail n'est pas valide!").css(CSS_ERROR);
            echec = true
        }
    }
    else{
        $("#msg").html("les emails ne sont pas les mêmes!").css(CSS_ERROR)
        echec = true
    }

    //on vérifie les mots de passe
    if ($data[3]['value'] === $data[4]['value']){
        //sont ils pas trop longs ?
        if ($data[3]['value'].length > 72 || $data[3]['value'].length === 0){
            $("#msg").html("la longueur du mot de passe est de plus de 72 caractères ou nulle!").css(CSS_ERROR)
            echec = true
        }
    }
    else
    {
        $("#msg").html("les mots de passe ne sont pas les mêmes!").css(CSS_ERROR)
        echec = true
    }

    $("#signup").submit(function (event) {
        if (echec == true) return false //on empêche l'envoi en cas de pb
        $.ajax({
            url: SIGNUP,
            method: "post",
            data: $data,
            dataType: "json"
        })
        return false; // pour empêcher le refresh de la page
    })
    // changeView("feed")
}



let writepost = () => {

}

let getLatestPosts = (n) => {
    //var query = "SELECT id_post, date, content, id_user FROM POST"
}