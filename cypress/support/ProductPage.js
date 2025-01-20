class ProductPage {
    navigateToProduct(productName) {
      cy.visit('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/'); 
      cy.get('.product-item-link').contains(productName).click(); 
    }
  
    selectSize(size) {
        cy.get('div.swatch-attribute.size').contains('size').click();
        //cy.get('[aria-label="Size"]').contains(size).click();
    }
  
    selectColor(color) {
      cy.get('[aria-label="Color"]').contains(color).click();
    }
  
    setQuantity(quantity) {
        cy.get('input#qty').clear().type('quantity'); 
        //cy.get('input.qty').clear().type(quantity);
    }
  
    addToCart() {
        cy.get('button#product-addtocart-button').click();
        //cy.get('#product-addtocart-button').click();
    }
  
    verifySuccessMessage() {
      cy.get('.message-success').should('be.visible').and('contain', 'You added');
    }
  }
  
  export default new ProductPage();
  