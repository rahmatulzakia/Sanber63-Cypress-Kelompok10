import customCommand from '../../support/commands';
import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';
import productPage from '../../support/pages/productPage';
import CartPage from '../../support/pages/CartPage';
import WishlistPage from '../../support/pages/WishlistPage';
import CheckoutPage from '../../support/pages/CheckoutPage';

// ---------------------------------------------------------------------------------
describe('TS001-Testing Shopping Cart', () => {

  it('TC001-Gagal saat menampilkan cart saat cart tidak ada item', () => {
    HomePage.visit();
    CartPage.openCart();
    CartPage.verifyEmptyCart();
  });

});

// ---------------------------------------------------------------------------------
describe('TS002-Menampilkan shopping cart saat terdapat item di dalamnya', () => {


  beforeEach(() => {
    cy.addItemToCart();
  });


  it('TC002-Berhasil menampilkan shopping cart', () => {
    CartPage.openCart();
    CartPage.viewCartDetails();
    cy.get('tr').should('have.class', 'item-info');
  });

});

// ---------------------------------------------------------------------------------
describe('TS003-Mengedit item di dalam cart', () => {
  beforeEach(() => {
    cy.addItemToCart();
  });

  it('TC003-Edit menambahkan item', () => {
    CartPage.openCart();
    CartPage.viewCartDetails();
    CartPage.updateItemQuantity(11);
    CartPage.verifyItemUpdated(11);
  });

  it('TC004-Gagal menambahkan item yang melebihi batas', () => {
    CartPage.openCart();
    CartPage.viewCartDetails();
    CartPage.updateItemQuantity(10000);
    cy.get('#modal-content-29 > div').should('contain', 'The requested qty is not available');
  });

  it('TC005-Gagal menginput jumlah item yang negatif', () => {
    CartPage.openCart();
    CartPage.viewCartDetails();
    CartPage.updateItemQuantity(-1);
    cy.get('.mage-error').should('be.visible').and('contain', 'Please enter a number greater than 0 in this field.');
  });

});

// ---------------------------------------------------------------------------------
describe('TS004-Menghapus item dari cart', () => {
  beforeEach(() => {
    cy.addItemToCart();
  });

  it('TC006-Berhasil hapus item', () => {
    CartPage.openCart();
    CartPage.viewCartDetails();
    CartPage.deleteAllItems();
    CartPage.verifyCartEmpty();
  });

});

// ---------------------------------------------------------------------------------
describe('TS005-Mengedit item dengan klik tombol edit', () => {
  beforeEach(() => {
    cy.addItemToCart();
  });

  it('TC007-Berhasil melakukan edit item dengan klik tombol edit', () => {
    CartPage.openCart();
    CartPage.viewCartDetails();
    CartPage.editItem(169, 57, 3);
    cy.get('.message-success').should('be.visible').and('contain', 'was updated in your shopping cart.');
  });

});

// ---------------------------------------------------------------------------------
describe('TS006-Move to Wishlist', () => {
  it('TC008-Berhasil memindahkan barang ke wishlist', () => {
    LoginPage.login('samanta.manta@guysmail.com', 'Samanta*10');
    HomePage.clickLogo();
    productPage.selectFirstProduct();
    productPage.addItemToCart(166, 56, 1);
    WishlistPage.moveToWishlist();
    WishlistPage.verifyItemAddedToWishlist();
  });

});

// ---------------------------------------------------------------------------------
describe('TS006-Melakukan Checkout', () => {
  it('TC009-Berhasil melakukan checkout', () => {
    LoginPage.login('samanta.manta@guysmail.com', 'Samanta*10');
    HomePage.clickLogo();
    cy.addItemToCart();
    CartPage.openCart();
    CartPage.viewCartDetails();
    cy.wait(4000);
    CheckoutPage.proceedToCheckout();
    CheckoutPage.verifyCheckoutPage();
  });

});