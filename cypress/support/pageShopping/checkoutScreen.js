class checkoutScreen {
    proceedToCheckout() {
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
    }
  
    verifycheckoutScreen() {
      cy.url().should('include', 'checkout/#shipping');
    }
  }
  
  export default new checkoutScreen();
  