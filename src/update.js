const MSGS = {
    START_QUIZ: "START_QUIZ",
    CREATE_CARD: "CREATE_CARD",
    UPDATE_QUESTION: "UPDATE_QUESTION",
    UPDATE_ANSWER: "UPDATE_ANSWER",
    SAVE_CARD: "SAVE_CARD",
    NEXT_CARD: "NEXT_CARD",
    TOGGLE_CARD: "TOGGLE_CARD",

    RANK_BAD: "RANK_BAD",
    RANK_GOOD: "RANK_GOOD",
    RANK_GREAT: "RANK_GREAT"
  };
  
  function update(msg, model) {
    switch (msg.type) {
      case MSGS.START_QUIZ: {
        // Karten aus Deck und bisherigen Rankings zusammenführen
        const allCards = [
        ...(model.deck || []),
        ...(model.badCards || []),
        ...(model.goodCards || []),
        ...(model.greatCards || [])
      ];

        const resetCards = allCards.map(c => ({ ...c, showing: "question" }));

        const [firstCard, ...restDeck] = resetCards;

        return { 
          ...model, 
          page: "quiz", 
          currentCard: firstCard, 
          deck: restDeck,
          badCards: [],
          goodCards: [],
          greatCards: []
         };
      }
      case MSGS.CREATE_CARD:
        return { ...model, page: "create" };
      case MSGS.UPDATE_QUESTION:
        return { ...model, newQuestion: msg.value };
      case MSGS.UPDATE_ANSWER:
        return { ...model, newAnswer: msg.value};
      case MSGS.SAVE_CARD: {
        //damit keine leeren Karten gespeichert werden können
        if (!model.newQuestion.trim() || !model.newAnswer.trim()) {
          return model;
        };
        const newCard = {
          question: model.newQuestion,
          answer: model.newAnswer,
          showing: "question"
        };

        return { 
          ...model, 
          deck: [ ...model.deck || [], newCard ], 
          newQuestion: "", 
          newAnswer: "", 
          page: "home"
        };
      }

      case MSGS.NEXT_CARD: {
        if (model.deck.length === 0) {
          return { ...model, currentCard: null };
        }
        const [nextCard, ...restDeck] = model.deck;
        return { ...model, currentCard: nextCard, deck: restDeck };
      }

      case MSGS.TOGGLE_CARD: {
        const card = model.currentCard;
        if (!card) return model;
        return {
            ...model,
            currentCard: {
                ...card,
                showing: card.showing === "question" ? "answer" : "question"
            }
        };
    }

    case MSGS.RANK_BAD: {
      const card = model.currentCard;
      if (!card) return model;
      return {
          ...model,
          badCards: [...model.badCards, card],
          currentCard: null
      };
  }
  
  case MSGS.RANK_GOOD: {
      const card = model.currentCard;
      if (!card) return model;
      return {
          ...model,
          goodCards: [...model.goodCards, card],
          currentCard: null
      };
  }
  
  case MSGS.RANK_GREAT: {
      const card = model.currentCard;
      if (!card) return model;
      return {
          ...model,
          greatCards: [...model.greatCards, card],
          currentCard: null
      };
  }

      default:
        return { ...model};
    };
  }
  
  module.exports = { update, MSGS };