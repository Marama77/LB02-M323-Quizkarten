const MSGS = {
    START_QUIZ: "START_QUIZ",
    CREATE_CARD: "CREATE_CARD",
    UPDATE_QUESTION: "UPDATE_QUESTION",
    UPDATE_ANSWER: "UPDATE_ANSWER",
    SAVE_CARD: "SAVE_CARD"
  };
  
  function update(msg, model) {
    switch (msg.type) {
      case MSGS.START_QUIZ: {
        const firstCards = model.deck.slice(0, 3);
        const restDeck = model.deck.slice(3);

        return { ...model, page: "quiz", activeCards: firstCards, deck: restDeck };
      }
      case MSGS.CREATE_CARD:
        return { ...model, page: "create" };
      case MSGS.UPDATE_QUESTION:
        return { ...model, newQuestion: msg.value };
      case MSGS.UPDATE_ANSWER:
        return { ...model, newAnswer: msg.value};
      case MSGS.SAVE_CARD: {
        if (!model.newQuestion.trim() || !model.newAnswer.trim()) {
          return model;
        };
        const newCard = {
          question: model.newQuestion,
          answer: model.newAnswer,
          showing: "question"
        };

        return { ...model, deck: [ ...model.deck, newCard ], newQuestion: "", newAnswer: "", activeCards: [], page: "home"};
      }
      default:
        return { ...model};
    };
  }
  
  module.exports = { update, MSGS };