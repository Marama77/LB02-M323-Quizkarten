function initModel() {
    return {
      page: "home",
      deck: [
        { question: "Welche Farbe hat ein Elefant?", answer: "Grau", showing: "question" },
        { question: "Was ist Currying?", answer: "", showing: "question" },
        { question: "Welcher Planet ist unserer Sonne am nächsten?", answer: "Merkur", showing: "question" },
        { question: "Wieviele Zacken hat ein Schneestern?", answer: "6", showing: "question" },
        { question: "Wie heisst eine männliche Biene?", answer: "Drohne", showing: "question" },
      ],
      activeCards: [],
    };
  }
  
  module.exports = { initModel };