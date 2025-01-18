describe('Login Functionality Tests', () => {
  const baseUrl = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Valid login', () => {
    cy.get('#email').type('rio@vomoto.com');
    cy.get('#pass').type('Testing123');
    cy.get('#send2').click();

    // Verifikasi login berhasil
    cy.contains('Welcome').should('be.visible');
  });

  it('Login with invalid email', () => {
    cy.get('#email').type('invalid@vomoto.com');
    cy.get('#pass').type('Testing123');
    cy.get('#send2').click();

    // Verifikasi pesan kesalahan
    cy.contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.').should('be.visible');
  });

  it('Login with incorrect password', () => {
    cy.get('#email').type('rio@vomoto.com');
    cy.get('#pass').type('WrongPassword123');
    cy.get('#send2').click();

    // Verifikasi pesan kesalahan
    cy.contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.').should('be.visible');
  });

  it('Login with empty email', () => {
    cy.get('#pass').type('Testing123');
    cy.get('#send2').click();

    // Verifikasi pesan kesalahan untuk email
    cy.get('.field.email .mage-error').should('contain', 'This is a required field');
  });

  it('Login with empty password', () => {
    cy.get('#email').type('rio@vomoto.com');
    cy.get('#send2').click();

    // Verifikasi pesan kesalahan untuk password
    cy.get('.field.password .mage-error').should('contain', 'This is a required field');
  });

  it('Login with invalid email format', () => {
    cy.get('#email').type('invalid-email-format');
    cy.get('#pass').type('Testing123');
    cy.get('#send2').click();

    // Verifikasi pesan kesalahan untuk format email
    cy.get('.field.email .mage-error').should('contain', 'Please enter a valid email address (Ex: johndoe@domain.com).');
  });

  it('Login with very long email and password', () => {
    const longEmail = 'a'.repeat(300) + '@domain.com';
    const longPassword = 'a'.repeat(300);

    cy.get('#email').type(longEmail);
    cy.get('#pass').type(longPassword);
    cy.get('#send2').click();

    // Verifikasi pesan kesalahan
    cy.contains('The account sign-in was incorrect').should('be.visible');
  });

  it('Login with all fields empty', () => {
    cy.get('#send2').click();

    // Verifikasi pesan kesalahan untuk email dan password
    cy.get('.field.email .mage-error').should('contain', 'This is a required field');
    cy.get('.field.password .mage-error').should('contain', 'This is a required field');
  });

  it('Verify "Forgot Your Password?" link functionality', () => {
    cy.contains('Forgot Your Password?').click();

    // Verifikasi navigasi ke halaman reset password
    cy.url().should('include', '/customer/account/forgotpassword');
    cy.contains('Forgot Your Password').should('be.visible');
  });

  it('Test XSS vulnerability in input fields', () => {
    const xssPayload = '<script>alert("XSS")</script>';

    cy.get('#email').type(xssPayload);
    cy.get('#pass').type(xssPayload);
    cy.get('#send2').click();

    // Pastikan payload XSS tidak dieksekusi
    cy.contains('Please enter a valid email address').should('be.visible');
  });
});
