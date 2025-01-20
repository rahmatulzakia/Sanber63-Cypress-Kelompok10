//This page object model belongs to rio

class Checkout {
  // Lokator elemen
  boxExistAddress = '.shipping-address-item.selected-item';
  buttonNewAddress = '.action.action-show-popup';
  firstname = 'input[name="firstname"]';
  lastname = 'input[name="lastname"]';
  street1 = 'input[name="street[0]"]';
  street2 = 'input[name="street[1]"]';
  street3 = 'input[name="street[2]"]';
  city = 'input[name="city"]';
  state = 'select[name="region_id"]';
  postcode = 'input[name="postcode"]';
  country = 'select[name="country_id"]';
  telephone = 'input[name="telephone"]';


  // Metode untuk interaksi dengan halaman
  visit() {
    cy.visit('/checkout'); // Mengarahkan ke halaman home page
  }

  clickNewAddress() {
    cy.get(this.buttonNewAddress)
    .should('be.visible') // Pastikan tombol terlihat
    .click();
  }

  // fillNewAddressForm(address) {
  //   cy.get(this.firstname).clear().type(address.firstname);
  //   cy.get(this.lastname).clear().type(address.lastname);
  //   cy.get(this.street1).clear().type(address.street1);
  //   cy.get(this.street2).clear().type(address.street2);
  //   cy.get(this.street3).clear().type(address.street3);
  //   cy.get(this.city).clear().type(address.city);
  //   cy.get(this.state).select(address.state);
  //   cy.get(this.postcode).clear().type(address.postcode);
  //   cy.get(this.country).select(address.country);
  //   cy.get(this.telephone).clear().type(address.phone);
  // }

  // submitNewAddress() {
  //   cy.get('#co-shipping-form button[type="submit"]').click(); // Klik tombol submit
  // }

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

export default new Checkout();
