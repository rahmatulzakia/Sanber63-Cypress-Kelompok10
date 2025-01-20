class CreateAccount {
    constructor() {
      // Selector elemen halaman
      this.emailField = '#email_address';
      this.passwordField = '#password';
      this.confirmPasswordField = '#password-confirmation';
      this.firstNameField = '#firstname';
      this.lastNameField = '#lastname';
      this.createButton = '.action.submit.primary';
    }
  
    // Metode untuk memasukkan data ke setiap field
    enterFirstName(firstName) {
      cy.get(this.firstNameField).type(firstName);
    }
  
    enterLastName(lastName) {
      cy.get(this.lastNameField).type(lastName);
    }
  
    enterEmail(email) {
      cy.get(this.emailField).type(email);
    }
  
    enterPassword(password) {
      cy.get(this.passwordField).type(password);
    }
  
    confirmPassword(password) {
      cy.get(this.confirmPasswordField).type(password);
    }
  
    clickCreateAccount() {
      cy.get(this.createButton).click();
    }
  
    // Metode untuk memeriksa pesan validasi
    verifyValidationError(fieldSelector, expectedMessage) {
      cy.get(fieldSelector).should('contain', expectedMessage);
    }
  
    // Metode untuk memverifikasi pesan sukses
    verifySuccessMessage() {
      cy.contains('Thank you for registering with Main Website Store.').should('be.visible');
      cy.url().should('include', '/customer/account/');
    }
  }
  
  module.exports = new CreateAccount();
  