/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('add new item', () => {
    cy.get('input[name="title"]').type('new item for test');
    cy.get('button[name="add"]').click();
  });
});
