
describe('Home', () => {

  it('Home Page can be opened', () => {
    cy.visit('/');
    cy.get('h1').contains('POP Items');
    cy.contains('Sort by');
  });

  it('Load elements', () => {
    cy.visit('/');
    cy.intercept('GET', '/items*').as('getItems')
    cy.wait(['@getItems']).then(
      (getItems) => {
        cy.get('app-item-card').should('have.length', 5);
      }
    );
  });

  it('Load more elements', () => {
    cy.visit('/');
    cy.intercept('GET', '/items*').as('getItems');
    cy.get('app-load-more button').click();
    cy.wait(['@getItems'])
    cy.get('app-item-card').should('have.length', 10);
  });

});


