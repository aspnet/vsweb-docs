/// <reference path="dataService.js" />

(function () {

    var nav = document.getElementById("nav"),
		burger = document.getElementById("burger"),
		main = document.getElementsByTagName("main")[0],
		hero = document.getElementById("hero"),
	    images = main.getElementsByTagName("img"),
		fadingInProgress = false;

    function syncMenu() {

        var open = nav.getElementsByClassName("open");
        for (var i = 0; i < open.length; i++) {
            // this is for popstate to adjust the menu
            open[i].removeAttribute("class");
            //open[i].setAttribute("aria-hidden", "true");
        }

        if (location.pathname === "/")
            return;

        var active = nav.getElementsByClassName("active");

        if (active.length === 0)
            return;

        var li = active[0].parentNode;

        if (!li) return;

        do {

            if (li.tagName === "LI" && li.childElementCount === 2) {
                li.className = "open";
                li.removeAttribute("aria-hidden");
            }

            li = li.parentNode;

        } while (li && li.parentNode !== nav);
    }

    function onBodyClick(e) {

        var href = e.target.getAttribute("href");

        if (e.target.tagName !== "A" || href.indexOf("#") === 0)
            return;

        if (location.pathname === href) {
            e.preventDefault();
            return;
        }

        if (e.target.id === burger.id) {
            onBurgerClick(e);
        }
        else if (e.target.nextElementSibling && e.target.nextElementSibling.tagName === "UL") {
            expandMenuParent(e);
        }
        else if (href.indexOf("://") === -1) {
            onLocalLinkClick(e, href);
        }
    }

    function expandMenuParent(e) {
        e.preventDefault();

        var parent = e.target.parentNode;

        if (parent.tagName !== "LI")
            return;

        parent.className = parent.className === "" ? "open" : "";

        // Close all other open menu items
        var open = nav.getElementsByClassName("open");
        for (var i = 0; i < open.length; i++) {
            if (parent !== open[i])
                open[i].removeAttribute("class");
        }
    }

    function onLocalLinkClick(e, url) {
        e.preventDefault();
        e.target.setAttribute("data-spinner", "true");

        history.pushState("pushed", null, url);
        replaceContent(url, e.target);
    }

    function setMenuActive() {
        var actives = nav.getElementsByClassName("active");
        for (var a = 0; a < actives.length; a++) {
            actives[a].removeAttribute("class");
        }

        var current = nav.querySelector("[href='" + location.pathname + "']")
        if (current)
            current.className = "active";
    }

    function replaceContent(url, target) {
        setMenuActive();

        dataService.getPage(url, function (page) {

            main.style.opacity = 0;
            toggleHero(page.url);
            target && target.removeAttribute("data-spinner");

            if (burger.offsetLeft > 0 || burger.offsetTop > 0) { // If small screen
                burger.nextElementSibling.style.visibility = "";
                burger.nextElementSibling.nextElementSibling.style.visibility = "";
            }

            setTimeout(function () {
                main.innerHTML = page.content;
                document.title = page.title;

                setTimeout(function () {
                    var index = url.indexOf("#");
                    if (index > 0) {
                        var target = document.getElementById(url.substring(index + 1))
                        target.scrollIntoView();
                    }
                }, 200)

                images = main.getElementsByTagName("img")
                fadeImagesIntoView();
                setFlipAheadLinks(page.next, page.prev);

                main.style.opacity = 1;
                syncMenu();

            }, 200);
        });
    }

    function onBurgerClick(e) {
        e.preventDefault();
        var ul = e.target.nextElementSibling.nextElementSibling;
        var visible = ul.style.visibility;
        ul.style.visibility = visible === "" ? "visible" : "";

        var form = e.target.nextElementSibling;
        form.style.visibility = ul.style.visibility;
    }

    function setFlipAheadLinks(next, prev) {
        var nextLink = document.head.querySelector("link[rel=next]");
        var prevLink = document.head.querySelector("link[rel=prev]");

        setLink(nextLink, next, "next");
        setLink(prevLink, prev, "prev");

        function setLink(link, href, rel) {
            if (href) {
                link = link || createLink(rel, href);
                link.href = href;
            }
            else if (link) {
                link.parentNode.removeChild(link);
            }
        }

        function createLink(rel, href) {
            var link = document.createElement("link");
            link.rel = rel;
            link.href = href;
            return document.head.appendChild(link);
        }
    }

    function toggleHero(href) {
        var showHero = (!href && location.pathname === "/") || href === "/";
        hero.className = showHero ? "" : "hide";
    }

    function fadeImagesIntoView() {
        if (fadingInProgress) return;

        fadingInProgress = true;

        setTimeout(function () {
            var height = window.innerHeight || document.documentElement.clientHeight;
            for (var i = 0; i < images.length; i++) {
                var image = images[i];

                var rect = image.getBoundingClientRect();
                image.style.opacity = rect.top >= -50 && rect.bottom <= height ? 1 : 0;

                if (rect.bottom > height)
                    break;
            }

            fadingInProgress = false;
        }, 200);
    }

    document.body.addEventListener("click", onBodyClick, false);

    window.addEventListener("popstate", function (e) {
        if (e.state === "pushed")
            replaceContent(location.pathname);
        else
            console.log(e);
    });

    window.addEventListener("scroll", fadeImagesIntoView, false);
    window.addEventListener("load", fadeImagesIntoView, false);
})();