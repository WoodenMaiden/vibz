(function () {
    "use strict"

    const MARKDOWN_LOGIN = [
        "<div />",
        "<form />"/*,
        [
             "",
             "",
             "",
             "",
        ]*/
    ];

    function changeView() {

        let $main = $("#main");
        // for (var val in MARKDOWN_LOGIN){
        $main.append("aaa");
        // }
    }

    $(() => {
        changeView();
    });

}) ();