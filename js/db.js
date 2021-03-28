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
    console.log($data[0]['value'])


    //on vérifie la validité des données :
    //TODO afficher les erreurs dans ue notif
    //est ce que les emails sont les mêmes ?
    if ($data[1]['value'] === $data[2]['value']){
        if ($data[1]['value'].length > 254) $("#signup").append("la longueur de l'email est de plus de 254 charactères!")
        else if ($data[1]['value'].match(/[A-Z][a-z]/) == null) //TODO finir la regex et le checking
            ;
    }
    else{
        $("#signup").append("les emails ne sont pas les mêmes!")
    }


    $("#signup").submit(function (event) {
        $.ajax({
            url: SIGNUP,
            method: "post",
            data: $data,
            dataType: "json"
        })
        return false; // pour éviter de refresh la page
    })
    // changeView("feed")
}



let writepost = () => {

}

let getLatestPosts = (n) => {
    //var query = "SELECT id_post, date, content, id_user FROM POST"
}

