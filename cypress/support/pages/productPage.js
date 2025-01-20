class ProductPage {
    selectFirstProduct() {
      cy.get(':nth-child(1) > .product-item-info').click();
    }
  
    selectSecondProduct() {
      cy.get(':nth-child(3) > .product-item-info').click();
    }
  
    selectSize(sizeId) {
      cy.get(`#option-label-size-143-item-${sizeId}`).click();
    }
  
    selectColor(colorId) {
      cy.get(`#option-label-color-93-item-${colorId}`).click();
    }
  
    enterQuantity(qty) {
      cy.get('#qty').clear().type(qty);
    }
  
    addToCart() {
      cy.get('#product-addtocart-button').click();
    }
  
    addItemToCart(sizeId, colorId, qty) {
      this.selectSize(sizeId);
      this.selectColor(colorId);
      this.enterQuantity(qty);
      this.addToCart();
      cy.wait(2000);
    }
  }
  
  export default new ProductPage();
  