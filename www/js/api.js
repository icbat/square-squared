var getUUID = function() {
    var uuid = localStorage.getItem('squareSquared-uuid');
    if (!uuid) {
        uuid = new Phaser.RandomDataGenerator([Date.now()]).uuid();
        localStorage.setItem('squareSquared-uuid', uuid);
    }
    return uuid;
};

var api = {
    url: "http://square-squared-stats.herokuapp.com/",
    uuid: getUUID()
};

api.postToApi = function(endpoint, payload) {
    console.log("Sending packet to " + endpoint);
    $.post(api.url + endpoint, payload, null, "json");
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

$( document ).ajaxError(function(event, request, settings) {
  console.error("Ajax thingy FAILED", event, request, settings);
});

$( document ).ajaxComplete(function( event,request, settings ) {
  console.log("Ajax thingy worked", event, request, settings);
});
