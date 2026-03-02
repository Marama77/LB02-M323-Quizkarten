const hh = require("hyperscript-helpers");
const { h } = require("virtual-dom");
const { div, button, span } = hh(h);

const { MSGS } = require("./update.js");

//Home-view
function homeView(dispatch) {
    const baseBtn ="text-white font-bold py-2 px-4 rounded w-64 text-center";
    const yellowBtn = baseBtn + " bg-yellow-500 hover:bg-yellow-700";
    const blueBtn = baseBtn + " bg-blue-500 hover:bg-blue-700";
  return div({ className: "flex flex-col gap-4 items-center" }, [
      button({ className: yellowBtn, onclick: () => dispatch(MSGS.START_QUIZ) }, "Quiz beginnen"),
      button({ className: blueBtn, onclick: () => dispatch(MSGS.CREATE_CARD) }, "Neue Karte erstellen"),
    ])
};

//Quiz-view
function quizView(dispatch) {
    return div({ className: "flex flex-col gap-4 items-center" }, [
      span("Hier beginnt das Quiz!"),
      button({ onclick: () => dispatch(MSGS.CREATE_CARD) }, "Zurück zur Karte")
    ])
};

//Create-view
function createView(dispatch) {
    return div({ className: "flex flex-col gap-4 items-center" }, [
      span("Erstelle eine neue Karte"),
      button({ onclick: () => dispatch(MSGS.START_QUIZ) }, "Quiz starten")
    ])
};

//Main-view
function view(dispatch, model) {
    if (model.page === "home") {
      return homeView(dispatch);
    }
    if (model.page === "quiz") {
      return quizView(dispatch, model);
    }
    if (model.page === "create") {
      return createView(dispatch);
    }
  
    return div("Seite nicht gefunden"); //Fallback
  }

module.exports = { view };