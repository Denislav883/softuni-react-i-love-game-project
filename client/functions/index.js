const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const server = require("./server/server");

exports.server = onRequest((req, res) => {
    server.emit("request", req, res);
});

setGlobalOptions({ maxInstances: 1, region: "europe-west4" });