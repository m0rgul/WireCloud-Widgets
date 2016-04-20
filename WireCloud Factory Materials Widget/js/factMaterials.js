(function () {
    "use strict";
    MashupPlatform.wiring.registerCallback('factoryId', function (data_string) {
        var factoryId = data_string;
        var baseURL = 'http://130.206.113.46/wirecloud/' + factoryId + '/materials';
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
    });

    var populateElements = function populateElements(data) {
        $('#materialsContainer').empty();
        var data = JSON.parse(data);
        data.forEach(function (material, index) {
            var imageSrc = "http://130.206.113.46" + material.image;
            var htmlElem = "<div class='materialItem col-md-12'>" +
                "<img src='" + imageSrc + "' alt='" + material.name + "'/>" +
                "<h3>" + material.name + "</h3>" +
                "<p class='description'>" + material.description + "</p>" +
                "<p class='stock'>Stock: <span>" + material.stock + "</span>kg.</p>" +
                "</div>";
            if(index <data.length-1)
                htmlElem += "<hr class='materialSep'/>";
            $('#materialsContainer').append(htmlElem);
        });
    };
})();