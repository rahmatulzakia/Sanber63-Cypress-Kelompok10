class CheckoutPage {
    proceedToCheckout() {
      cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
    }
  
    verifyCheckoutPage() {
      cy.url().should('include', 'checkout/#shipping');
    }
  }
  
  export default new CheckoutPage();
  