// This file belongs to rio
import LoginPage from '../../support/pages/login-page';
import HomePage from '../../support/pages/home-page';
import Checkout from '../../support/pages/checkout';
import modalShippingAddress from '../../support/pages/modal-shipping-address';

describe('Processed to Checkout - Add New Address', () => {
  beforeEach(() => {
    cy.fixture('data-rio').as('userData'); // Load fixture dan beri alias 'userData'
    LoginPage.visit(); // Navigasi ke halaman login sebelum setiap pengujian
  });

  it('user add new address with valid data', function () {
    // Gunakan cy.get() untuk mengakses alias userData
    cy.get('@userData').then((userData) => {
      const { validUser, inputs } = userData;
      // cy.log('Inputs:', inputs[0].input.firstname);

      // Login menggunakan kredensial valid
      LoginPage.login(validUser.email, validUser.password);
     
      // Add Produk 1
      HomePage.visit();
      HomePage.clickDetailProduct1();
      cy.wait(3000);
      HomePage.clickSizeProduct1();
      HomePage.clickExistColorProduct1();
      HomePage.clickAddProduct1();

      // Procced to checkout
      HomePage.clickShowCart();
      HomePage.clickProccedToCart();

      // Set New Address
      Checkout.clickNewAddress();

      cy.wait(3000);
      // Isi form alamat baru
      modalShippingAddress.fillFormValid(inputs[0].input);

      // Submit alamat baru
      modalShippingAddress.clickSaveButton();

      // Add Produk Berhasil
      cy.wait(2000);
      cy.contains('Next').should('be.visible');
    });
  });

  it('user add new address with empty first name', function () {
    // Gunakan cy.get() untuk mengakses alias userData
    cy.get('@userData').then((userData) => {
      const { validUser, inputs } = userData;
      // cy.log('Inputs:', inputs[0].input.firstname);

      // Login menggunakan kredensial valid
      LoginPage.login(validUser.email, validUser.password);
     
      // Add Produk 1
      HomePage.visit();
      HomePage.clickDetailProduct1();
      cy.wait(3000);
      HomePage.clickSizeProduct1();
      HomePage.clickExistColorProduct1();
      HomePage.clickAddProduct1();

      // Procced to checkout
      HomePage.clickShowCart();
      HomePage.clickProccedToCart();

      // Set New Address
      Checkout.clickNewAddress();

      cy.wait(3000);
      // Isi form alamat baru

      const isBlank = {
        firstname: true,
        lastname: false,
        company: false,
        street1: false,
        street2: false,
        street3: false,
        city: false,
        state: false,
        postcode: false,
        country: false,
        phone: false
      }

      modalShippingAddress.fillFormCustom(inputs[1].input, isBlank);

      // Submit alamat baru
      modalShippingAddress.clickSaveButton();

      // Add Produk Berhasil
      cy.wait(2000);
      cy.contains('This is a required field.').should('be.visible');
    });
  });
});
