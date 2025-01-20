class WishlistPage {
    moveToWishlist() {
      cy.get('.towishlist').click();
    }
  
    verifyItemAddedToWishlist() {
      cy.get('.message-success')
        .should('be.visible')
        .and('contain', 'has been added to your Wish List.');
    }
  }
  
  export default new WishlistPage();
  