/// <reference types="cypress" />
/// <reference types="cypress-plugin-tab" />

describe('Murdle cards testing', () => {
  it('Clicks using the mouse', () => {
    cy.visit('/');

    cy.get('.small-card').should('have.length', 3);
    cy.contains('Admiral Navy', { matchCase: false }).should('exist');
    cy.contains('Babyface Blue', { matchCase: false }).should('exist');
    cy.contains('Baron Maroon', { matchCase: false }).should('exist');

    // TODO this doesn't work
    /* cy.get('.small-card-back').first().should('be.visible');
    cy.get('.small-card-front').first().should('not.be.visible'); */

    // Turn the cards over
    cy.get('.small-card').first().click();

    // Open a big card
    cy.get('.small-card').first().click();
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Go to next big card
    cy.get('.card--button-arrow-next').click();
    cy.contains(
      'This is absolutely one fully grown man, and not 2 kids in a trench-coat. They can do adult things like see R rated movies, buy beer, and stay out way past bedtime.',
      { matchCase: false }
    ).should('exist');

    // Go to previous big card
    cy.get('.card--button-arrow-prev').click();
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Go to next card then set card down
    cy.get('.card--button-arrow-next').click();
    cy.contains(
      'This is absolutely one fully grown man, and not 2 kids in a trench-coat. They can do adult things like see R rated movies, buy beer, and stay out way past bedtime.',
      { matchCase: false }
    ).should('exist');
    cy.contains('set card down', { matchCase: false }).click();
    cy.contains('set card down', { matchCase: false }).should('not.exist');
    cy.focused().should('include.text', 'Babyface Blue');

    // set card down when clicking outside
    cy.get('.small-card').first().click();
    cy.get('.big-cards').click(0, 0);
    cy.contains('set card down', { matchCase: false }).should('not.exist');
  });

  it.only('Clicks using the keyboard', () => {
    cy.visit('/');

    cy.contains('Admiral Navy', { matchCase: false }).should('exist');
    cy.contains('Babyface Blue', { matchCase: false }).should('exist');
    cy.contains('Baron Maroon', { matchCase: false }).should('exist');

    // Pressing a random key doesn't turn the cards over
    cy.get('.small-card').first().type('n');

    // Turn the cards over using enter
    cy.get('.small-card').first().type('{enter}');

    // Pressing a random key doesn't open a big card
    cy.get('.small-card').first().type('n');
    cy.contains('set card down', { matchCase: false }).should('not.exist');

    // Open a big card using enter
    cy.get('.small-card').first().type('{enter}');
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Pressing a random key doesn't change the big card
    cy.get('.card--button-arrow-next').trigger('keydown', { keyCode: '78' });
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');
    cy.get('.card--button-arrow-prev').trigger('keydown', {
      keyCode: '78',
    });
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');
    cy.get('.card--button-setdown').trigger('keydown', {
      keyCode: '78',
    });
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Go to next big card using enter
    cy.get('.card--button-arrow-next').type('{enter}');
    cy.contains(
      'This is absolutely one fully grown man, and not 2 kids in a trench-coat. They can do adult things like see R rated movies, buy beer, and stay out way past bedtime.',
      { matchCase: false }
    ).should('exist');

    // Go to previous big card using enter
    cy.get('.card--button-arrow-prev').type('{enter}');
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Go to next big card using arrow
    cy.get('body').type('{rightArrow}');
    cy.contains(
      'This is absolutely one fully grown man, and not 2 kids in a trench-coat. They can do adult things like see R rated movies, buy beer, and stay out way past bedtime.',
      { matchCase: false }
    ).should('exist');

    // Go to previous big card using arrow
    cy.get('body').type('{leftArrow}');
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Set card down using enter
    // TODO this doesn't work
    cy.get('.card--button-setdown').type('{enter}');
    cy.get('.card--button-setdown').type('{enter}');
    cy.get('.card--button-setdown').trigger('keydown', {
      keyCode: '13',
      force: true,
    });
    //cy.contains('set card down', { matchCase: false }).should('not.exist');

    /* // Set card down using escape
    cy.get('body').type('{esc}');
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('not.exist');

    // Open a big card using spacebar
    cy.get('.small-card').first().type(' ');
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Go to next big card using spacebar
    cy.get('.card--button-arrow-next').type(' ');
    cy.contains(
      'This is absolutely one fully grown man, and not 2 kids in a trench-coat. They can do adult things like see R rated movies, buy beer, and stay out way past bedtime.',
      { matchCase: false }
    ).should('exist');

    // Go to previous big card using spacebar
    cy.get('.card--button-arrow-prev').type(' ');
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Set card down using spacebar
    // TODO this doesn't work either
    //cy.get('.card--button-setdown').type(' ');
    //cy.contains('set card down', { matchCase: false }).should('not.exist'); */
  });

  xit('Focuses the relevant element when tabbing', () => {
    cy.visit('/');

    // The first small card should be focused
    cy.focused().should('have.class', 'small-card');

    // Turn the cards over using spacebar
    cy.get('.small-card').first().type(' ');

    // Open a big card
    cy.get('.small-card').first().click();
    cy.contains(
      'The firstborn son of an Admiral Navy who himself was the son of an Admiral Navy. He is rarely seen without a cigar dangling from his lips, and he always smells faintly of the sea.',
      { matchCase: false }
    ).should('exist');

    // Set card down button should be focused
    cy.focused().should('have.class', 'card--button-setdown');

    // Pressing tab means the next arrow should be focused
    cy.get('.card--button-setdown').tab();
    cy.focused().should('have.class', 'card--button-arrow-next');

    // Pressing tab means the previous arrow should be focused
    cy.get('.card--button-arrow-next').tab();
    cy.focused().should('have.class', 'card--button-arrow-prev');
  });
});
