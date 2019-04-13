const express = require("express");

const actionRoute = require("./routes/action-route");
const projectRoute = require("./routes/project-route");

const server = express();

server.use(express.json());

server.use("/api/actions", actionRoute);
server.use("/api/projects", projectRoute);

module.exports = server;
