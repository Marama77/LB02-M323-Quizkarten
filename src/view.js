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

function quizView(dispatch, model) {
  // Prüfen, ob Quiz fertig ist
  if (!model.currentCard && model.deck.length === 0) {
    return div({ className: "flex flex-col gap-4 items-center" }, [
      div({ className: "text-xl font-bold" }, "Quiz beendet!"),
      div("Bad: " + model.badCards.length),
      div("Good: " + model.goodCards.length),
      div("Great: " + model.greatCards.length),
      button(
        { className: "bg-blue-500 text-white px-4 py-2 rounded",
          onclick: () => dispatch({ type: MSGS.START_QUIZ }) },
        "Quiz neu starten"
      )
    ]);
  }

  const card = model.currentCard; // card definieren
  const cardStyle = "bg-yellow-300 w-[190px] h-64 rounded shadow cursor-pointer p-3 flex flex-col justify-start text-center";
  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 text-center";

  return div({ className: "flex flex-col gap-6 items-center" }, [
    div({ className: "text" }, "Beantworten Sie die Frage und decken Sie dann die Antwort auf!"),

    card
      ? div({ className: "flex flex-col items-center relative" }, [
        //Kreuz zum Löschen
        button({
          className: "absolute top-0 right-0 text-red-600 font-bold px-2 py-1",
          onclick: () => dispatch({ type: MSGS.DELETE_CARD })
        }, "×"),
      
        //Karte selbst
        div(
          { className: cardStyle, onclick: () => dispatch({ type: MSGS.TOGGLE_CARD }) },
          [
            div({ className: "font-bold underline mb-1" }, "QUIZFRAGE"),
            div({ className: "flex-1 flex items-center justify-center" }, card.question),
            div({ className: "font-bold underline mb-1" }, "ANTWORT"),
            card.showing === "answer" ? div({ className: "mt-2 text-green-700 font-semibold" }, card.answer) : null,
      
            div({ className: "flex gap-2 mt-2" }, [
              button({
                className: "bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded",
                onclick: () => dispatch({ type: MSGS.RANK_BAD })
              }, "Bad"),
      
              button({
                className: "bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded",
                onclick: () => dispatch({ type: MSGS.RANK_GOOD })
              }, "Good"),
      
              button({
                className: "bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded",
                onclick: () => dispatch({ type: MSGS.RANK_GREAT })
              }, "Great")
            ])
          ]
        )
      ])
      : null,

    button({ className: buttonStyle, onclick: () => dispatch({ type: MSGS.NEXT_CARD }) }, "Nächste Karte"),
    button({ className: buttonStyle, onclick: () => dispatch({ type: MSGS.CREATE_CARD }) }, "Neue Karte erstellen")
  ]);
}

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