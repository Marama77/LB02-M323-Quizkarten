const MSGS = {
    START_QUIZ: "START_QUIZ",
    CREATE_CARD: "CREATE_CARD",
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
      default:
        return { ...model };
    }
  }
  
  module.exports = { update, MSGS };