const { app } = require("./app.js");
const { view } = require("./view.js");
const { update } = require("./update.js");
const { initModel } = require("./model.js");

const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);