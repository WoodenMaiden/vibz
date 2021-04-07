/**
 * @author Yann POMIE
 * @file main.js
 */


import {changeView} from './util.js'

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



    $( () => {
        changeView("login");
        // changeView("signup");
        console.log("jquery et js fonctionnent :D");
    })

}) ();

