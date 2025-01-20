import customCommand from '../../support/commands';
import authPage from '../../support/pageShopping/authPage';
import mainPage from '../../support/pageShopping/mainPage';
import productView from '../../support/pageShopping/productView';
import cartView from '../../support/pageShopping/cartView';
import wishlistScreen from '../../support/pageShopping/wishlistScreen';
import checkoutScreen from '../../support/pageShopping/checkoutScreen';

// ---------------------------------------------------------------------------------

describe('TS001-Testing Shopping Cart', () => {

  it('TC001-Gagal saat menampilkan cart saat cart tidak ada item', () => {
    mainPage.visit();
    cartView.openCart();
    cartView.verifyEmptyCart();
  });

});

// ---------------------------------------------------------------------------------

describe('TS002-Menampilkan shopping cart saat terdapat item di dalamnya', () => {


  beforeEach(() => {
    cy.addItemToCart();
  });


  it('TC002-Berhasil menampilkan shopping cart', () => {
    cartView.openCart();
    cartView.viewCartDetails();
    cy.get('tr').should('have.class', 'item-info');
  });

});

// ---------------------------------------------------------------------------------

describe('TS003-Mengedit item di dalam cart', () => {
  beforeEach(() => {
    cy.addItemToCart();
  });

  it('TC003-Edit menambahkan item', () => {
    cartView.openCart();
    cartView.viewCartDetails();
    cartView.updateItemQuantity(11);
    cartView.verifyItemUpdated(11);
  });

  it('TC004-Gagal menambahkan item yang melebihi batas', () => {
    cartView.openCart();
    cartView.viewCartDetails();
    cartView.updateItemQuantity(10000);
    cy.get('#modal-content-29 > div').should('contain', 'The requested qty is not available');
  });

  it('TC005-Gagal menginput jumlah item yang negatif', () => {
    cartView.openCart();
    cartView.viewCartDetails();
    cartView.updateItemQuantity(-1);
    cy.get('.mage-error').should('be.visible').and('contain', 'Please enter a number greater than 0 in this field.');
  });

});

// ---------------------------------------------------------------------------------

describe('TS004-Menghapus item dari cart', () => {
  beforeEach(() => {
    cy.addItemToCart();
  });

  it('TC006-Berhasil hapus item dengan klik tombol hapus', () => {
    cartView.openCart();
    cartView.viewCartDetails();
    cartView.deleteAllItems();
    cartView.verifyCartEmpty();
  });

});

// ---------------------------------------------------------------------------------

describe('TS005-Mengedit item dengan klik tombol edit', () => {
  beforeEach(() => {
    cy.addItemToCart();
  });

  it('TC007-Berhasil melakukan edit item dengan klik tombol edit', () => {
    cartView.openCart();
    cartView.viewCartDetails();
    cartView.editItem(169, 57, 3);
    cy.get('.message-success').should('be.visible').and('contain', 'was updated in your shopping cart.');
  });

});

// ---------------------------------------------------------------------------------

describe('TS006-Move to Wishlist', () => {
  it('TC008-Berhasil memindahkan barang ke wishlist', () => {
    authPage.login('samanta.manta@guysmail.com', 'Samanta*10');
    mainPage.clickLogo();
    productView.selectFirstProduct();
    productView.addItemToCart(166, 56, 1);
    wishlistScreen.moveToWishlist();
    wishlistScreen.verifyItemAddedToWishlist();
  });

});

// ---------------------------------------------------------------------------------

describe('TS006-Melakukan Checkout', () => {
  it('TC009-Berhasil melakukan checkout', () => {
    authPage.login('samanta.manta@guysmail.com', 'Samanta*10');
    mainPage.clickLogo();
    cy.addItemToCart();
    cartView.openCart();
    cartView.viewCartDetails();
    cy.wait(4000);
    checkoutScreen.proceedToCheckout();
    checkoutScreen.verifycheckoutScreen();
  });

});