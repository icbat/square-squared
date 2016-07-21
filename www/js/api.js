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

api.postToApi = function(endpoint, payload) {
    $.post(api.url + endpoint, payload, function(response) {
        console.log(response);
    }, "json");
};

api.report = {
    launch: function() {
        api.postToApi("launch", JSON.stringify({
            "uuid": api.uuid
        }));
    },
    gameStart: function() {
        api.postToApi("gameStart", JSON.stringify({
            "uuid": api.uuid
        }));
    },
    score: function(score) {
        api.postToApi("score", JSON.stringify({
            "uuid": api.uuid,
            "score": score
        }));
    }
};
