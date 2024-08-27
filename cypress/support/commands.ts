/// <reference types="cypress" />
// ***********************************************

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session(
    email,
    () => {
      cy.visit('/sign-in');
      cy.get('input#email').type(email);
      cy.get('input#password').type(`${password}{enter}`, { log: false });
      cy.url().should('include', '/dashboard');
      cy.get('div#email').should('contain', email);
    },
    {
      validate: () => {
        cy.window().its('localStorage.accessToken').should('exist');
        cy.window().its('localStorage.refreshToken').should('exist');
      },
    },
  );
});
