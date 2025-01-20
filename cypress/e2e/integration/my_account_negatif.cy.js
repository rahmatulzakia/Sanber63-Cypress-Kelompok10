describe('Negative Test Cases for My Account and Addresses on Magento', () => {
    before(() => {
      // Set Base URL
      Cypress.config('baseUrl', 'https://magento.softwaretestingboard.com');
    });
  
    it('Attempts to log in with incorrect credentials', () => {
      cy.log('Navigating to login page');
      cy.visit('/customer/account/login/');
      cy.get('#email').type('invalid_user@test.com'); // Email salah
      cy.get('#pass').type('wrongpassword'); // Password salah
      cy.get('#send2').click();
  
      // Verify error message
      cy.log('Checking for error message');
      cy.get('.message-error').should('be.visible')
        .and('contain.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    });
  
    it('Attempts to save an invalid billing address', () => {
      cy.log('Navigating to login page');
      cy.visit('/customer/account/login/');
      cy.get('#email').type('kelompok10@test.com'); // Email benar
      cy.get('#pass').type('kELOMPOK05'); // Password benar
      cy.get('#send2').click();
  
      // Navigate to Manage Addresses
      cy.contains('My Account').click();
      cy.contains('Manage Addresses').click();
      cy.contains('Add New Address').click();
  
      // Attempt to save an invalid billing address
      cy.log('Filling invalid billing address');
      cy.get('#firstname').clear().type(''); // Kosongkan nama depan
      cy.get('#lastname').clear().type(''); // Kosongkan nama belakang
      cy.get('#telephone').clear().type('123'); // Nomor telepon invalid
      cy.get('#street_1').clear().type(''); // Alamat kosong
      cy.get('button[title="Save Address"]').click();
  
      // Verify error message
      cy.get('.messages').should('be.visible')
        .and('contain.text', 'This is a required field.'); // Validasi field yang kosong
    });
  
    it('Attempts to save an invalid shipping address', () => {
      cy.log('Navigating to Manage Addresses page');
      cy.contains('My Account').click();
      cy.contains('Manage Addresses').click();
      cy.contains('Add New Address').click();
  
      // Attempt to save an invalid shipping address
      cy.log('Filling invalid shipping address');
      cy.get('#firstname').clear().type('123InvalidName'); // Nama depan invalid
      cy.get('#lastname').clear().type('Invalid!'); // Nama belakang invalid
      cy.get('#telephone').clear().type('!@#$%^'); // Nomor telepon invalid
      cy.get('#street_1').clear().type('%%##%%'); // Alamat invalid
      cy.get('#city').clear().type(''); // Kosongkan kota
      cy.get('#zip').clear().type(''); // Kosongkan ZIP
      cy.get('button[title="Save Address"]').click();
  
      // Verify error message
      cy.get('.messages').should('be.visible')
        .and('contain.text', 'This is a required field.'); // Validasi field yang kosong atau invalid
    });
  });
  