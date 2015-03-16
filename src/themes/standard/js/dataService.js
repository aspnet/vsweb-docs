var dataService = (function () {

	var pageCache = [];

	function getPage(url, callback) {

		var cached = pageCache[url];

		if (cached) {
			callback(cached);
			return;
		}

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.setRequestHeader("X-Content-Only", "1");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var page = { url: url, content: xhr.responseText, title: xhr.getResponseHeader("X-Title"), next: xhr.getResponseHeader("X-Next"), prev: xhr.getResponseHeader("X-Prev") };
				pageCache[url] = page;
				callback(page);
			}
		};

		xhr.send();
	}

    function sendXhr(url, callback) {

        if (sessionStorage && sessionStorage[url]) {
            callback(sessionStorage[url]);
            return;
        }

        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                callback(http.responseText);

                if (http.status === 200 && sessionStorage)
                    sessionStorage[url] = http.responseText;
            }
        }

        http.send(null);
    }

	return {
	    getPage: getPage,
        sendXhr: sendXhr,
	}

})();