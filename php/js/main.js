/**
 * @author Yann POMIE
 * @file main.js
 */

(function () {
    "use strict";

    //CONSTANTES
    const BASE = "http://vibz.alwaysdata.net/"
    const SIGNUP = BASE + "php/signup.php";
    const LOGIN = BASE + "php/login.php";
    const IS_CONNECTED = BASE + "php/isConnected.php";
    const LOGOUT = BASE + "php/logout.php";
    const GET_LATEST = BASE + "php/getlatest.php";
    const LIKE_UNLIKE = BASE + "php/like_unlike.php";
    const WRITEMSG = BASE + "php/writemsg.php";
    const GOTO_PROFILE = BASE + "php/gotoprofile.php"
    const GET_POSTS_BY_ID = BASE + "php/getPostsbyId.php";

    //CONSTANTES CSS
    const CSS_STYLE_BODY = {
        "background-color": "#3a79cc"
    }

    const CSS_STYLE_POST = {
        "border" : "solid 2px black",
        "border-radius": "30px",
        "background-color": "#e8e8e8",
        "padding": "5px",
        "margin" : "5px"
    }

    const CSS_ERROR = {
        "color" : "#d70000"
    }

    const CSS_SUCESS = {
        "color": "green"
    }
    const CSS_NAVBAR = {
        "background-color": "#3ac2cc",
        "display": "flex",
        "flex-direction": "row",
        "justify-content": "space-evenly",
        "position": "sticky",
        "top" : "0px",
        "z-index": "3"
    }

    const CSS_ICONS = {
        "cursor": "pointer",
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "-o-user-select": "none",
        "user-select": "none",
    }

    const CSS_MAIN_DEFAULT = {
        "display": "block",
        "margin": "5%"
    }
    const CSS_FEED = {
        "display" : "flex",
        "flex-direction" : "column",
        "min-width" : "50%"
    }

    const CSS_FEED_POSTCTN = {
        "display" : "flex",
        "flex-direction": "row-reverse",
        "margin": "5%",
        "justify-content" : "space-evenly"
    }

    const CSS_POST_WRITER = {
        "position": "sticky",
        "top": "60px",
        "border": "2px solid black",
        "border-radius": "30px",
        "margin" : "5px",
        "height" : "15vh"
    }

    const CSS_POST_HEADER = {
        "backgroud-color" : "grey",
        "z-index": "2",
        "display" : "flex",
        "flex-direction": "row"
    }

    const CSS_PFP = {
        "font-size" : "500px"
    }

    /////////
    //Posts//
    /////////

    /**
     * @description appel ajax asynchrone qui retourne le template des publications
     * @return : string du template
     */
    let getTemplate = () => {
        let result
        $.ajax({
            url: BASE + 'view/post_place_holder.txt',
            method: 'POST',
            dataType: "text",
            async: false
        })
            .done(function (data) {result = data})
        return result;
    }


    /**
     * @objet qui représente un post
     *
     */
    let POST = class {
        static placeholder = getTemplate();

        constructor(name, msg, date, likes, idpost) {
            this.completeHTML = POST.placeholder;
            this.name = name;
            this.msg = msg;
            this.date = date;
            this.likes = likes;
            this.idpost = idpost;
        }

        toString (){
            return this.completeHTML.replace(/~u~/, this.name)
                                    .replace(/~d~/, this.date)
                                    .replace(/~m~/, this.msg)
                                    .replace(/~l~/, this.likes)
                                    .replace(/~i~/gm, this.idpost);
        }

        like(){
            let Jdata = {like : true, postid : this.idpost}
            $.ajax({
                url : LIKE_UNLIKE,
                method : "POST",
                data : $.param(Jdata), // param() permet de serialize notre json
                dataType : "json"
            })
            .done(function (data) {
                console.log("liké!");
                console.log(data)
            })
            .fail(function (data) {
                console.log("erreur post.like()");
                console.log(data)
            })
        }

        unlike(){
            let Jdata = {like : false, postid : this.idpost}
            $.ajax({
                url : LIKE_UNLIKE,
                method : "POST",
                data : $.param(Jdata), // param() permet de serialize notre json
                dataType : "json"
            })
            .done(function (data) {
                console.log("like annulé!");
                console.log(data)
            })
            .fail(function (data) {
                console.log("erreur post.unlike()");
                console.log(data)
            })
        }

        gotoProfile(){
            //on va retrouver l'id du profil à patir de l'id du message
            $.ajax({
                url : GOTO_PROFILE,
                method : "POST",
                data : "id_post=" + this.idpost,
                dataType : "json"
            })
            .done(function (dt) {
                if (dt.hasOwnProperty("data")){

                    console.log("gotoProfile()");
                    console.log(dt.data.nom);

                    $.when(changeView("profile")).done(function (dtwhen) {

                        let $usr = $("#usr_account");
                        let $name = $("#name");

                        if (dt.data.status != 0) {
                            $usr.html("security");
                        }

                        $usr.css(CSS_PFP);
                        $name.html(dt.data.nom);

                        $.when(getPostsById(dt.data.id)).done(function (json) {
                            appendPosts(json);
                        });
                    })
                }
            })
            .fail(function (data) {
                console.log("erreur");
            })
        }
    }


    /**
     * @description va chercher les n derniers posts
     * @param n
     * @return une requete ajax qui retourne les posts dans un json
     */

    let getPosts = (n) => {
        return $.ajax({
            url : GET_LATEST,
            method : "POST",
            data : "n="+n,
            dataType : "json"
        })
        .done(function (data){
            //TODO
            console.log(data);
            return data;
        })
        .fail(function () {
            console.log("une erreur est survenue getposts")
            $("#msg").append("Une erreur est survenue lors du chargement des posts, contactez un administrateur").css(CSS_ERROR);
        })
    }

    let getPostsByID = (i) => {
        return $.ajax({
            url : GET_POSTS_BY_ID,
            method : "POST",
            data : "id="+i,
            dataType : "json"
        })
            .done(function (data){
                //TODO
                console.log(data);
                return data;
            })
            .fail(function () {
                console.log("une erreur est survenue getposts")
                $("#msg").append("Une erreur est survenue lors du chargement des posts, contactez un administrateur").css(CSS_ERROR);
            })
    }

    /**
     * @description affiche les posts dans le json
     * @param data json retourné par getPosts()
     */
    let appendPosts = (data) => {
        let $container = $("#post_content");
        let listMessages;

        if (data.hasOwnProperty("posts")) {
            listMessages = data.posts;

            listMessages.forEach(function (value) {

                let post = new POST(value.name, value.content, value.date, value.likes, value.id_post);
                $container.append(post.toString());

                let $liked = $(`#y${value.id_post}`);
                let $unliked = $(`#n${value.id_post}`);
                let $likecpt = $(`#l${value.id_post}`);
                let $profile = $(`#p${value.id_post}`);
                let $header = $(".header");
                let cpt = parseInt($likecpt.text(), 10);

                $liked.css(CSS_ICONS).hide()
                $liked.click(function (event) {
                    //ici on dislike
                    --cpt;
                    $unliked.show();
                    $likecpt.html(cpt);
                    $liked.hide();
                    post.unlike();
                });

                $unliked.css(CSS_ICONS).click(function (event) {
                    //ici on like
                    ++cpt;
                    $unliked.hide();
                    $likecpt.html(cpt);
                    $liked.show();
                    post.like();
                });

                $header.css(CSS_POST_HEADER)
                $profile.click(function (event) {
                    post.gotoProfile();
                })
            });
        }
        $(".post").css(CSS_STYLE_POST);
    }



    ////////////
    //Database//
    ////////////

    /**
     *  @description  connecte un utilisateur à la bd
     *  @return rien, si il y a une erreur un message est affiché sinon on va sur le feed
     */

    let login = () => {
        let $form = $("#login");
        let $msg = $("#msg");
        $msg.html("");
        let success = true;


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


        return $.ajax({
            url : LOGIN,
            method: "POST",
            data: $form.serialize(),
            dataType: "json"

        })
            .done(function (data) {
                console.log("requete envoyée!");
                if (data.hasOwnProperty("result") && data.hasOwnProperty("message")) {
                    if (data.result) {
                        // window.location.refresh(true);
                        console.log("connexion réussie");
                        changeView('feed');
                        return false;

                    } else {
                        success = data.result;
                        console.log("connexion echouée");
                        console.log(data);
                        return false;
                    }
                }

            })
            .fail( function () {
                console.log("erreur");
                return false;

            })
    }

    /**
     * @description inscrit un utilisateur
     * @return rien, si il y a une erreur un message est affiché sinon on va sur le feed
     */

    let signup = () => {
        let $form = $("#signup");
        let $msg = $("#msg");
        $msg.html("")


        let $dataArray = $form.serializeArray();


        //on vérifie la validité des données :

        //on vérifie si le pseudo :
        //  - n'est pas vide
        //  - ne contient pas d'espaces
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

        return $.ajax({
            url: SIGNUP,
            method: "POST",
            data: $form.serialize(),
            dataType: "json"

        }).done(function (data) {
            if (data.hasOwnProperty("result")) {
                if (data.result) {
                    changeView('login');
                    $msg.html("inscription réussie, connectez vous").css(CSS_SUCESS);
                    return false
                } else {
                    console.log(data);
                    if (data.hasOwnProperty("message")) {
                        $msg.html(data.message);
                    }
                    return false;
                }
            }
        })
        .fail(function (data) {
            console.log(data);
            console.log("Erreur signup()");
            return false;
        })
    }

    /**
     * @description deconnecte
     */
    let logout = () => {
        $.ajax({
            url : LOGOUT,
            method : "POST",
            dataType: "json"
        }).done(function (data) {
            if (data.hasOwnProperty("result")) {
                console.log("déconnecté");
                changeView("login");
            }
        })
        .fail(function (){
            console.log("une erreur est survenue logout()");
        })

        $("#icon_logout").hide();
        $("#icon_account").click(function () {changeView("login"); return false})
        $("#icon_login").show();

    }

    /**
     * @description permet de sasvoir si l'utilisateur est connecté
     * @return bool
     */

    let connected = false;

    let isConnected = () => {
        $.ajax({
            url : IS_CONNECTED,
            method : "POST",
            dataType: "json"
        }).done(function (data) {
            if (data.hasOwnProperty("result")) {
                connected = data.result;
            }
        })
        .fail(function (){
            console.log("une erreur est survenue isConnected");
        })

        connected = true
        return false;
    }
    
    let writemsg = () => {
        let $form = $("#postwriter");
        let $msg = $("#msg");
        let $txt = $("#txtmsg");
        $msg.html("");
        let content = $txt.val();

        //on va vérifier la validité du message

        // est il vide ou > à 240 caractères
        if (content.length < 1 || content.length > 240){
            $msg.html("La longueur du message n'est pas comprise entre 0 et 240 caractères !").css(CSS_ERROR);
            return false;
        }

        //contient il du html ?
        let matchscript = content.match(/<+.*\/*>*<*\/+>+/g);
        if (matchscript != null){
            $msg.html("On avait dit pas de html...").css(CSS_ERROR);
            return false;
        }

        return $.ajax({
            url: WRITEMSG,
            method: "POST",
            data : $form.serialize(),
            dataType : "json"
        })
        .done(function (data) {
            console.log(data);
            if (data.hasOwnProperty("result")){
                if (data.result){
                    console.log("message envoyé!");
                    return false;
                }
                else{
                    $msg.html("une erreur est survenue").css(CSS_ERROR);
                    $msg.fadeOut(5000);
                    return false;
                }
            }
        })
        .fail(function (data) {
            console.log("erreur lors de la requete ajax");
            console.log(data);
            return false;
        })


    }




    ////////
    //Util//
    ////////


    /**
     * @description fonction permettant de télécharger une vue
     * @param file : string vers la vue a charger (.html)
     * @return une requête ajax afin qu'elle soit utilisée dans un $.when() dans changeView
     */

    let ajaxView = (file) => {
        // retourne la vue en html
        return $.ajax({
            url : BASE + "view/" + file + ".html",
            method : "get",
            dataType : "html"
        })
            .done(function (data) {
                return data
            })
            .fail(function () {
                console.log("Erreur lors de l'accès de " + BASE + "view/" + file + ".html");
                ajaxView("404");
            })
    }

    /**
     * @description appelle et attends que la requete ajax view finisse, change la vue et va appliquer les listeners
     * @param file : string
     */
    let changeView = (file)=>{
        $.when(ajaxView(file)).done(function (data){
            $("#main").html(data);
            $("#main").css(CSS_MAIN_DEFAULT);
            $("#icon_refresh").hide();

            // on va appliquer le nécéssaire sur les éléments de la page
            switch (file) {
                case 'login' :
                    $("#login").submit(function () {login(); return false;});
                    $("#gotosignup").click(function () {changeView("signup"); return false;});
                    break;

                case 'signup':
                    $("#signup").submit(function () {signup(); return false;});
                    $("#gotosignup").click(function () {changeView("login"); return false;});
                    break;

                case 'feed':
                    $.when(getPosts(100)).done(function (data) {

                        $("#main").css(CSS_FEED_POSTCTN);
                        $("#post_content").css(CSS_FEED);
                        $("#postdiv").css(CSS_POST_WRITER);
                        $("#postwriter").submit(function () {writemsg(); return false;})
                        appendPosts(data);
                        $("#icon_refresh").show();
                    });
                    break;

                case 'profile':


            }
        })
    }




    //$(document).ready()
    $( () => {

        $("#navbar").css(CSS_NAVBAR);
        $(".material-icons").css(CSS_ICONS);
        $(document.body).css(CSS_STYLE_BODY)

        console.log("jquery et js fonctionnent :D");

        $("#icon_logout").hide().click(function () {logout(); return false;});
        $("#icon_account").click(function () {changeView("profile"); return false});
        $("#icon_login").show().click(function () {changeView("login"); return false});
        $("#icon_refresh").click(function () {changeView("feed"); return false;}); //appel indirect à appendPosts()

        $(".material-icons").css("font-size", "42px");


        //changeView("login");
        //changeView("signup");

        isConnected(); // modfie connected

        if (connected){
            $("#icon_login").hide();
            $("#icon_account").click(function () {changeView("profile"); return false}).show()
            $("#icon_logout").show();
            changeView("feed");
            console.log("connecté");
        }
        else {
            console.log("pas connecté");
            $("#icon_logout").hide();
            $("#icon_account").click(function () {changeView("login"); return false})
            $("#icon_login").show();
            changeView("login");
        }

    })

}) ();

