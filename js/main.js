/**
 * @author Yann POMIE
 * @file main.js
 */


(function () {
    "use strict";


    //CONSTANTES
    const BASE = "http://vibz.alwaysdata.net/"
    const STYLE_MAIN = {
        "background": "#00b169"
    }
    const STYLE_POST = {
        "border" : "solid 2px black",
        "border-radius": "30px"
    }
    const SIGNUP = ""

    /**
     * @description lance une requête ajax pour charger et afficher les n derniers messages
     *
     *  @param n : nombre de posts à charger et a afficher
     */
    let getPosts = (n) => {
        for (var i = 0; i < n; ++i){
            /*$.ajax({
                url : BASE + "/view/" + file,
                method : "get",
                dataType : "text"
            })*/
            $("#post_content").append(i)
        }
    }
    $( () => {
        changeView("signup");
        console.log("jquery et js fonctionnent :D");
    })

}) ();

