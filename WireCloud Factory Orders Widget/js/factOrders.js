(function () {
    "use strict";
    MashupPlatform.wiring.registerCallback('factoryId', function (data_string) {
        var factoryId = data_string;
        var baseURL = 'http://130.206.113.46/wirecloud/' + factoryId + '/orders';
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
        $('#orderDetails').empty();
        data.forEach(function (order) {
            var download = "<a href='http://130.206.113.46/orders/download/" + order.file + "'>" +
                order.originalFile + "</a>";

            var tableElem = "<tr>" +
                "<td>" + order.client + "</td>" +
                "<td>" + dateFormat(order.orderDate) + "</td>" +
                "<td>" + dateFormat(order.deadline) + "</td>" +
                "<td>" + download + "</td>" +
                "<td>" + order.status + "</td>" +
                "<td>" + dateFormat(order.startDate) + "</td>" +
                "<td>" + dateFormat(order.endDate) + "</td>" +
                "<td>" + order.machine + "</td>" +
                "<td>" + order.material + "</td>" +
                "<td>" + order.comments + "</td></tr>";

            $('#orderDetails').append(tableElem);
        });
    };

    var dateFormat = function dateFormat(date) {
        var date = new Date(date);
        console.log(date);
        var yyyy = date.getFullYear();
        console.log(yyyy);
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return "" + mm + "/" + dd + "/" + yyyy + " " + hh + ":" + mm;
    };
})();