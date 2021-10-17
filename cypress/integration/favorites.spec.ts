import { itemMockModel } from '../../src/app/modules/items/mocks/item-mock.model';

describe('Favorites', () => {

  it('Add favorite', () => {
    cy.visit('/');
    cy.intercept('GET', '/items*', [ itemMockModel ]).as('getItems');
    cy.get('app-item-card p > span > svg-icon').click();
    cy.contains('Added to favorites');
  });

  it('Remove favorite', () => {
    cy.visit('/');
    cy.intercept('GET', '/items*', [ itemMockModel ]).as('getItems');
    cy.get('app-item-card p > span > svg-icon').click();
    cy.get('app-item-card p > span > svg-icon').click();
    cy.contains('Removed from favorites');
  });

  it('Check favorite in modal', () => {
    cy.visit('/');
    cy.intercept('GET', '/items*', [ itemMockModel ]).as('getItems');
    cy.get('app-item-card p > span > svg-icon').click();
    cy.get('header svg-icon').click();
    cy.get('app-modal').contains('Favorites');
    cy.get('app-modal app-favorite-card').should('be.visible');
  });

  it('Remove favorite in modal', () => {
    cy.visit('/');
    cy.intercept('GET', '/items*', [ itemMockModel ]).as('getItems');
    cy.get('app-item-card p > span > svg-icon').click();
    cy.get('header svg-icon').click();
    cy.get('app-modal').contains('Favorites');
    cy.get('app-modal app-favorite-card').should('be.visible');
    cy.get('app-favorite-card svg-icon').click();
    cy.get('app-modal').contains('Not found');
  });

});


