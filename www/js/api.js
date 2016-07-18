var api = {
    url: "https://square-squared-stats.herokuapp.com/"
};

api.report = {
    launch: function() {
        var payload = JSON.stringify({
            "replaceMe": "withUUID"
        });
        $.post(api.url + "launch", payload, null, "json");
    }
};
