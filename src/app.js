const { div, button } = require("hyperscript-helpers");
const { diff, patch, h } = require("virtual-dom");
const createElement = require("virtual-dom/create-element");

//Startpunkt. Verbindet Startzustand, update, view und echtes DOM.
function app(initModel, update, view, node) {
  let model = initModel();
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);

//"Nachrichtenzentrale".
  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

module.exports = { app };