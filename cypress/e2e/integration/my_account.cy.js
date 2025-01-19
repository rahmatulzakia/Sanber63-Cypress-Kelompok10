describe('Edit My Account and Addresses on Magento', () => { 
    before(() => { 
      Cypress.config('baseUrl', 'https://magento.softwaretestingboard.com'); 
    }); 
   
    it('Logs in, edits account info, and updates billing & shipping addresses', () => { 
      // Login 
      cy.visit('/customer/account/login/'); 
      cy.get('#email').type('kelompok10@test.com'); 
      cy.get('#pass').type('kELOMPOK04'); 
      cy.get('#send2').click(); 
   
      // Edit Account Information 
      cy.contains('Edit').first().click(); 
      cy.url().should('include', '/customer/account/edit/'); 
      cy.get('#firstname').clear().type('kelompok'); 
      cy.get('#lastname').clear().type('12'); 
      cy.get('#change-password').check(); 
      cy.get('#current-password').type('kELOMPOK04'); // Password saat ini 
      cy.get('#password').type('kELOMPOK05'); // Password baru 
      cy.get('#password-confirmation').type('kELOMPOK05'); // Konfirmasi password baru 
      cy.get('button[title="Save"]').click(); 
   
      // Verify account info saved 
      cy.get('.message-success', { timeout: 10000 }) 
        .should('be.visible') 
        .and('contain.text', 'You saved the account information.'); 
   
      // User redirected to login after password change 
      cy.log('Login ulang setelah mengganti password'); 
      cy.visit('/customer/account/login/'); 
      cy.get('#email').type('kelompok10@test.com'); // Login ulang 
      cy.get('#pass').type('kELOMPOK05'); // Gunakan password baru 
      cy.get('#send2').click(); 
   
      // Navigate to Manage Addresses 
      cy.get('.customer-name').first().click(); // Klik nama user untuk membuka dropdown 
      cy.contains('My Account').click(); 
      cy.contains('Manage Addresses').click(); 
   
      // Verify URL for Manage Addresses 
      cy.url().should('include', '/customer/address/'); 
   
      // Add Billing Address 
      cy.contains('Add New Address').click(); 
      cy.url().should('include', '/customer/address/new'); 
      cy.get('#firstname').clear().type('Kelompok'); 
      cy.get('#lastname').clear().type('12'); 
      cy.get('#company').clear().type('PT cinta sejati'); 
      cy.get('#telephone').clear().type('081234567890'); 
      cy.get('#street_1').clear().type('Jl. Merdeka No. 123'); 
      cy.get('#city').clear().type('Jakarta'); 
      cy.get('#region_id', { timeout: 10000 }) // Tunggu hingga dropdown tersedia 
        .should('be.visible') // Pastikan dropdown terlihat 
        .select('Alaska'); // Pilih State/Province 
      cy.get('#zip').clear().type('AB1234'); 
      cy.get('#country', { timeout: 10000 }) // Tunggu hingga dropdown tersedia 
        .should('be.visible') // Pastikan dropdown terlihat 
        .select('United States'); // Pilih Country 
      cy.get('button[title="Save Address"]').click(); 
   
      // Add Shipping Address 
      cy.contains('Add New Address').click(); 
      cy.get('#firstname').clear().type('Kelompok Shipping'); 
      cy.get('#lastname').clear().type('12'); 
      cy.get('#company').clear().type('PT cinta sejati'); 
      cy.get('#telephone').clear().type('081987654321'); 
      cy.get('#street_1').clear().type('Jl. Merdeka No. 123'); 
      cy.get('#city').clear().type('Bandung'); 
      cy.get('#region_id', { timeout: 10000 }) // Tunggu hingga dropdown tersedia 
        .should('be.visible') // Pastikan dropdown terlihat 
        .select('Alaska'); // Pilih State/Province 
      cy.get('#zip').clear().type('AB1234'); 
      cy.get('#country', { timeout: 10000 }) // Tunggu hingga dropdown tersedia 
        .should('be.visible') // Pastikan dropdown terlihat 
        .select('United States'); // Pilih Country 
      cy.get('button[title="Save Address"]').click(); 
    }); 
  });