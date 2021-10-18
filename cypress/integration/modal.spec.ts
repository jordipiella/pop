
describe('Modal', () => {

  it('Favorite modal can be opened', () => {
    cy.visit('/');
    cy.get('header svg-icon').click();
    cy.get('app-modal').not('Favorites');
    cy.get('app-modal').not('Not found');
  });

  it('Favorite modal can be closed', () => {
    cy.visit('/');
    cy.get('header svg-icon').click();
    cy.get('app-modal > div > div').click();
    cy.wait(500);
    cy.get('app-modal').not('Favorites');
    cy.get('app-modal').not('Not found');
  });

});


