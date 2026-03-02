const MSGS = {
    START_QUIZ: "START_QUIZ",
    CREATE_CARD: "CREATE_CARD",
  };
  
  function update(msg, model) {
    switch (msg) {
      case MSGS.START_QUIZ:
        return { ...model, page: "quiz" };
      case MSGS.CREATE_CARD:
        return { ...model, page: "create" };
      default:
        return { ...model };
    }
  }
  
  module.exports = { update, MSGS };