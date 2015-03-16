/// <reference path="dataService.js" />

(function () {

    var searchField = document.getElementById("q"),
        searchButton = document.getElementById("searchbutton"),
        datalist = document.getElementsByTagName("datalist")[0];

    function search(e) {

        var q = searchField.value;

        if (q.trim().length === 0) {
            e.preventDefault();
            searchField.focus();
        }
    }

    function clear() {
        var path = location.pathname;

        setInterval(function () {
            if (location.pathname !== path) {
                path = location.pathname;
                searchField.value = "";
            }
        }, 1000)
    }

    function typing(e) {

        if (e.target.value.length === 0) {
            datalist.innerHTML = "";
            return;
        }

        if (datalist.childNodes.length > 0)
            return;

        dataService.sendXhr("/views/keywords.cshtml", function (data) {
            var keywords = JSON.parse(data);
            for (var i = 0; i < keywords.length; i++) {
                var keyword = keywords[i];
                var option = document.createElement("option");
                option.innerHTML = keyword;
                datalist.appendChild(option);
            }
        });
    }

    function onFocus(e) {
        datalist.innerHTML = "";
    }

    searchButton.addEventListener("click", search, false);
    searchField.addEventListener("focus", onFocus, false);
    searchField.addEventListener("keyup", typing, false);
    window.addEventListener("load", clear, false);
})();