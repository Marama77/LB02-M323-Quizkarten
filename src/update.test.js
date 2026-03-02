// TEST 1 – START_QUIZ zieht 3 Karten
{
    const model = createModel();
  
    const newModel = update({ type: MSGS.START_QUIZ }, model);
  
    assert.strictEqual(newModel.page, "quiz");
    assert.strictEqual(newModel.activeCards.length, 3);
    assert.strictEqual(newModel.deck.length, 1);
  
// alte Struktur darf nicht verändert sein (Immutability-Test)
    assert.strictEqual(model.page, "home");
    assert.strictEqual(model.activeCards.length, 0);
    assert.strictEqual(model.deck.length, 4);
  }