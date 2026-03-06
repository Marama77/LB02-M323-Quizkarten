const { update, MSGS } = require("./update.js");

// Testet, dass beim Starten des Quiz (START_QUIZ) die erste Karte aus dem Deck
// als aktuelle Karte (currentCard) gesetzt wird, die Seite auf "quiz" wechselt
// und das restliche Deck korrekt übrig bleibt.
test("START_QUIZ setzt die erste Karte als currentCard", () => {
  const model = {
    deck: [
      { question: "Q1", answer: "A1" },
      { question: "Q2", answer: "A2" }
    ],
    badCards: [],
    goodCards: [],
    greatCards: []
  };

  const newModel = update({ type: MSGS.START_QUIZ }, model);

  expect(newModel.page).toBe("quiz");
  expect(newModel.currentCard).toEqual({ question: "Q1", answer: "A1", showing: "question" });
  expect(newModel.deck.length).toBe(1); // Restdeck enthält die zweite Karte
});