// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import productPage from '../support/pages/productPage';
class customCommand{}

Cypress.Commands.add('addItemToCart', () => {
  cy.visit('/');
  
  // Menambahkan produk pertama
  productPage.selectFirstProduct();
  productPage.addItemToCart(166, 56, 4);

  cy.visit('/');
  
  // Menambahkan produk kedua
  productPage.selectSecondProduct();
  productPage.addItemToCart(166, 52, 5);
});


Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');
  cy.get('#email').type(email);
  cy.get('#pass').type(password);
  cy.get('#send2').click();
  cy.wait(2000);
});

  export default new customCommand()