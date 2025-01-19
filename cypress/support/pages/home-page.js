//This page object model belongs to rio

class HomePage {
  // Lokator elemen
  detailProduct1 = 'a[title="Radiant Tee"]';
  sizeProduct1 = '.swatch-attribute.size .swatch-option';
  colorProduct1 = '[aria-label="Blue"]';
  buttonAddProduct1 = 'button[title="Add to Cart"]';

  buttonCart = 'a.action.showcart';
  buttonProccedToCart = 'button#top-cart-btn-checkout';
  boxExistAddress = '.shipping-address-item.selected-item';
  buttonNewAddress = '.action.action-show-popup';

  // Metode untuk interaksi dengan halaman
  visit() {
    cy.visit('/'); // Mengarahkan ke halaman home page
  }

  clickDetailProduct1() {
    cy.get(this.detailProduct1).click();
  }

  clickSizeProduct1() {
    cy.get(this.sizeProduct1).contains('M').click();
  }

  clickExistColorProduct1() {
    cy.get(this.colorProduct1, { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .click();
  }

  clickAddProduct1() {
    cy.get(this.buttonAddProduct1).click();
  }

  clickShowCart() {
    cy.get(this.buttonCart) // Seleksi elemen berdasarkan kelas
    .should('exist') // Pastikan elemen ada
    .should('be.visible') // Pastikan elemen terlihat
    .click(); // Klik elemen
  }

  clickProccedToCart() {
     // Pastikan elemen tombol terlihat, lalu klik
     cy.get(this.buttonProccedToCart) // Seleksi elemen berdasarkan ID
     .should('exist') // Memastikan elemen ada di DOM
     .should('be.visible') // Memastikan elemen terlihat
     .click(); // Klik elemen
  }

  clickNewAddress() {
    cy.get(this.buttonNewAddress)
    .should('be.visible') // Pastikan tombol terlihat
    .click();
  }

  // optionExistAddressNewAddress() {
  //   cy.get(this.boxExistAddress).then($element => {
  //     if ($element.length === 0) {
  //       // Jika elemen tidak ada, klik tombol "New Address"
  //       cy.get(this.buttonNewAddress)
  //       .should('be.visible') // Pastikan tombol terlihat
  //       .click();
  //     } else {
  //       // Jika elemen ada, lanjutkan tanpa klik apa pun
  //       cy.log('Selected shipping address already exists.');
  //     }
  //   });
  // }
}

export default new HomePage();
