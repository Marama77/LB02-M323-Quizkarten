const hh = require("hyperscript-helpers");
const { h } = require("virtual-dom");
const { div, button, span, input } = hh(h);

const { MSGS } = require("./update.js");

//Home-view
function homeView(dispatch) {
    const baseBtn ="text-white font-bold py-2 px-4 rounded w-64 text-center";
    const yellowBtn = baseBtn + " bg-yellow-500 hover:bg-yellow-700";
    const blueBtn = baseBtn + " bg-blue-500 hover:bg-blue-700";
  return div({ className: "flex flex-col gap-4 items-center" }, [
      button({ className: yellowBtn, onclick: () => dispatch({type: MSGS.START_QUIZ}) }, "Quiz beginnen"),
      button({ className: blueBtn, onclick: () => dispatch({type: MSGS.CREATE_CARD}) }, "Neue Karte erstellen"),
    ])
};

//Quiz-view
//function quizView(dispatch) {
    //return div({ className: "flex flex-col gap-4 items-center" }, [
     // span("Hier beginnt das Quiz!"),
     // button({ onclick: () => dispatch(MSGS.CREATE_CARD) }, "Zurück zur Karte")
    //])
//};
function quizView(dispatch, model) {
  const cardStyle =
    "bg-yellow-300 w-44 h-64 flex items-center justify-center rounded shadow cursor-pointer text-center p-2";
  // Button-Stil für „Neue Karte erstellen“
  const buttonStyle = 
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 text-center";

  return div({ className: "flex flex-col gap-6 items-center" }, [
    div({ className: "text " }, "Beantworten Sie die Frage und decken Sie dann die Antwort auf!"),
    // Karten nebeneinander
    div({ className: "flex gap-4" },
      model.activeCards.map((card, index) =>
        div(
          {
            className: cardStyle,
            //onclick: () =>
              //dispatch({ type: MSGS.TOGGLE_CARD, index }),
          },
          card.showing === "question" ? card.question : card.answer
        )
      )
    ),
    // Button für neue Karte erstellen
    button({ className: buttonStyle, onclick: () => dispatch({ type: MSGS.CREATE_CARD }) }, "Neue Karte erstellen")
  ])
  
};

//Create-view
function createView(dispatch, model) {
  const inputStyle = "border p-2 rounded w-64";
    return div({ className: "flex flex-col gap-4 items-center" }, [
      span("Erstelle eine neue Karte"),

      input({
        className: inputStyle,
        type: "text",
        placeholder: "Frage eingeben",
        value: model.newQuestion,
        oninput: (e) =>
          dispatch({ type: MSGS.UPDATE_QUESTION, value: e.target.value })
      }),

      input({
        className: inputStyle,
        type: "text",
        placeholder: "Antwort eingeben",
        value: model.newAnswer,
        oninput: (e) =>
          dispatch({ type: MSGS.UPDATE_ANSWER, value: e.target.value })
      }),

      button({ 
        className: "bg-green-500 text-white px-4 py-2 rounded",
        onclick: () => dispatch({ type: MSGS.SAVE_CARD }) }, "Karte speichern")
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
      return createView(dispatch, model);
    }
  
    return div("Seite nicht gefunden"); //Fallback
  }

module.exports = { view };