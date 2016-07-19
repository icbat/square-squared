var getUUID = function() {
    var uuid = localStorage.getItem('squareSquared-uuid');
    if (!uuid) {
        uuid = new Phaser.RandomDataGenerator([Date.now()]).uuid();
        localStorage.setItem('squareSquared-uuid', uuid);
    }
    return uuid;
};

var api = {
    url: "https://square-squared-stats.herokuapp.com/",
    uuid: getUUID()
};

api.report = {
    launch: function() {
        var payload = JSON.stringify({
            "uuid": api.uuid
        });
        $.post(api.url + "launch", payload, null, "json");
    },
    gameStart: function() {
        var payload = JSON.stringify({
            "uuid": api.uuid
        });
        $.post(api.url + "gameStart", payload, null, "json");
    },
    score: function(score) {
        var payload = JSON.stringify({
            "uuid": api.uuid,
            "score": score
        });
        $.post(api.url + "score", payload, null, "json");
    }
};
