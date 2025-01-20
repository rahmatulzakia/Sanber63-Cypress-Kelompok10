class cartView {
  openCart() {
    cy.get('.showcart').click();
  }

  viewCartDetails() {
    cy.get(':nth-child(7) > .secondary').click();
  }

  verifyEmptyCart() {
    cy.get('.subtitle').should('be.visible').and('have.text', 'You have no items in your shopping cart.');
  }

  updateItemQuantity(qty) {
    cy.get('input[id^="cart-"]').each(($input) => {
      cy.wrap($input).clear().type(qty);
    });
    cy.get('.update').click().wait(3000);
  }

  verifyItemUpdated(qty) {
    cy.get('input[id^="cart-"]').should('have.value', qty);
  }

  deleteAllItems() {
    cy.get('.action-delete').then(($deleteButtons) => {
      if ($deleteButtons.length > 0) {
        cy.wrap($deleteButtons).each(() => {
          cy.get('.action-delete').first().click();
          cy.wait(2000);
        });
      }
    });
  }

  verifyCartEmpty() {
    cy.get('.cart-empty > :nth-child(1)').should('contain', 'You have no items in your shopping cart.');
  }

  editItem(sizeId, colorId, qty) {
    cy.get('.action-edit').first().click();
    cy.wait(2000);
    cy.get(`#option-label-size-143-item-${sizeId}`).click();
    cy.get(`#option-label-color-93-item-${colorId}`).click();
    cy.get('#qty').clear().type(qty);
    cy.get('#product-updatecart-button').click();
  }
}

export default new cartView();
