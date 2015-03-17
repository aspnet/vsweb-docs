/// <reference path="dataService.js" />

(function () {

    var searchField = document.getElementById("q"),
        searchButton = document.getElementById("searchbutton"),
        datalist = document.getElementsByTagName("datalist")[0],
        hiddenLink;

    function search(e) {

        var q = searchField.value;

        if (q.trim().length === 0) {
            e.preventDefault();
            searchField.focus();
        }

        if (!hiddenLink) {
            // This will let menu.js handle the page load as if it was a link click.
            e.preventDefault();
            hiddenLink = document.createElement("a");
            hiddenLink.href = "/search/" + encodeURIComponent(q);
            searchButton.parentNode.appendChild(hiddenLink);
            hiddenLink.click();
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

    function onFocus(e) {

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

    searchButton.addEventListener("click", search, false);
    searchField.addEventListener("focus", onFocus, false);
    window.addEventListener("load", clear, false);
})();