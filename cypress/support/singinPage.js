class SigninPage {
    // Locator elements
    emailInput = '#email';
    passwordInput = '#pass';
    signinButton = '#send2';
    emailError = '#email-error';
    passwordError = '#pass-error';
  
    // Methods to interact with elements
    typeEmail(email) {
      cy.get(this.emailInput).type(email);
    }
  
    typePassword(password) {
      cy.get(this.passwordInput).type(password);
    }
  
    clickSignin() {
      cy.get(this.signinButton).click();
    }
  
    verifyEmailErrorMessage(message) {
      cy.get(this.emailError).should('contain', message);
    }
  
    verifyPasswordErrorMessage(message) {
      cy.get(this.passwordError).should('contain', message);
    }
  }
  
  module.exports = new SigninPage();
  