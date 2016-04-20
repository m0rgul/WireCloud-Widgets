(function () {
    "use strict";
    MashupPlatform.wiring.registerCallback('factoryId', function (data_string) {
        var factoryId = data_string;
        var baseURL = 'http://130.206.113.46/wirecloud/' + factoryId + '/stats';
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
        if (data.logo) {
            var src = "http://130.206.113.46" + data.logo;
            $('.factoryImage').attr('src', src).attr('alt', data.name);
        } else
            $('.factoryImage').hide();
        if (data.name)
            $('.factoryName').html(data.name).show();
        else
            $('.factoryName').hide();

        if (data.description)
            $('.factoryDescription').html(data.description).show();
        else
            $('.factoryDescription').hide();

        if (data.machines)
            $('.factoryMachines').html('Available printers: ' + data.machines).show();
        else
            $('.factoryMachines').hide();

        if (data.materials)
            $('.factoryMaterials').html("Available materials: " + data.materials).show();
        else
            $('.factoryMaterials').hide();
    };
})();