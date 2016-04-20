(function () {
    "use strict";
    MashupPlatform.wiring.registerCallback('factoryId', function (data_string) {
        var factoryId = data_string;
        var baseURL = 'http://130.206.113.46/wirecloud/' + factoryId + '/machines';
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
        var data = JSON.parse(data);
        $('#printersContainer').empty();
        data.forEach(function (machine, index) {
            var imageSrc = "http://130.206.113.46" + machine.image;
            var htmlElem = "<div class='printerItem col-md-12'>" +
                "<img src='" + imageSrc + "' alt='" + machine.name + "'/>" +
                "<h3>" + machine.name + "</h3>" +
                "<p class='description'>" + machine.description + "</p>" +
                "<p class='mats'>Compatible materials: <span>" + machine.materials.toString().split(',').join(', ') + "</span></p>" +
                "</div>";
            if (index < data.length - 1) {
                console.log('add hr!');
                htmlElem += "<hr class='printerSep'/>";
            }
            $('#printersContainer').append(htmlElem);
        });
    };
})();