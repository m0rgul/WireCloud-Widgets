(function () {
    "use strict";
    var baseURL = 'http://130.206.113.46/wirecloud/getAllFactories';
    MashupPlatform.http.makeRequest(baseURL,
        {
            method: "GET",
            contentType: "application/json",
            onSuccess: function (response) {
                populateElements(response.responseText);
            },
            onFailure: function (response) {
                console.log(response);
            },
            onComplete: function () {
            }
        });

    var populateElements = function populateElements(data) {
        var data = JSON.parse(data);
        data.forEach(function (factory, index) {
            var imageSrc = "http://130.206.113.46" + factory.logo;
            var htmlElem = "<li class='factoryItem' factoryId='" + factory.id + "'>" +
                "<img src='" + imageSrc + "' alt = '" + factory.name + "' / > " +
                "<h3>" + factory.name + "</h3></li>";
            if (index < data.length - 1)
                htmlElem += "<li class='sep'></li>";
            $('.factoryList').append(htmlElem);
        });

        $('.factoryItem').each(function () {
            var factId = $(this).attr('factoryId');
            $(this).click(function () {
                MashupPlatform.wiring.pushEvent('factoryId', factId);
            });
        });
    };
})();