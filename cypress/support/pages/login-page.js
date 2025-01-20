//This page object model belongs to rio

class LoginPage {
  // Lokator elemen
  emailInput = '#email'; // Lokator untuk input email
  passwordInput = '#pass'; // Lokator untuk input password
  loginButton = '#send2'; // Lokator untuk tombol login
  errorMessage = '.message-error'; // Lokator untuk pesan error

  // Metode untuk interaksi dengan halaman
  visit() {
    cy.visit('/customer/account/login/'); // Mengarahkan ke halaman login
  }

  fillEmail(email) {
    cy.get(this.emailInput).type(email); // Mengisi email
  }

  fillPassword(password) {
    cy.get(this.passwordInput).type(password); // Mengisi password
  }

  clickLoginButton() {
    cy.get(this.loginButton).click(); // Klik tombol login
  }

  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('contain', message); // Verifikasi pesan error
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLoginButton();
  }
}

export default new LoginPage();
