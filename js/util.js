/**
 * @author Yann POMIE
 * @file util.js
 */

const BASE = "http://vibz.alwaysdata.net/"

/**
 * @description fonction permettant de charger une vue à partir d'un fichier
 *
 * @param content : chemin vers la vue a charger (.html)
 */

let changeView = (file) => {

    $.ajax({
        url : BASE + "view/" + file + ".html",
        method : "get",
        dataType : "html"
    })
    .done(function (data) {
        $("#main").html(data);
        // if(file === "feed") getPosts(10)
    })
    .error(function () {
        console.log("Erreur lors de l'accès de " + BASE + "view/" + file + ".html");
        changeView("feed");
    })
}


export {changeView}