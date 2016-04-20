(function () {
    "use strict";
    var baseURL='http://130.206.113.46/wirecloud/generalStats';
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

        if (data.machines && data.machines > 0)
            $('.printers').find('span').html(data.machines);
        else
            $('.printers').parent().hide();

        if (data.factories && data.factories > 0)
            $('.factories').find('span').html(data.factories);
        else
            $('.factories').parent().hide();

        if (data.clients && data.clients > 0)
            $('.clients').find('span').html(data.clients);
        else
            $('.clients').parent().hide();

        if (data.orders && data.orders > 0)
            $('.orders').find('span').html(data.orders);
        else
            $('.orders').parent().hide();

        if (data.materials && data.materials > 0)
            $('.materials').find('span').html(data.materials);
        else
            $('.materials').parent().hide();
    };
})();