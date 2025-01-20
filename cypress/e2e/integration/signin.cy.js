import SigninPage from "../../support/singinPage";

describe('Magento Sign In Automation Tests', () => {
    const baseUrl = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';
   
    beforeEach(() => {
      cy.visit(baseUrl);
      cy.fixture('data_putri').as('loginData');
      cy.get('body').should('not.be.empty');
    });
  
    it('TC-001: Sign in with valid data', function () {
      const { email, password } = this.loginData.inputLogin;
      SigninPage.typeEmail(email);
      SigninPage.typePassword(password);
      SigninPage.clickSignin();
  
      // Verify successful login
      cy.get(':nth-child(2) > .greet > .logged-in');
      cy.contains('Welcome').should('be.visible');
    });
  
    it('TC-002: Sign in with invalid email', function () {
      const { password } = this.loginData.inputLogin;
  
      SigninPage.typeEmail('invalid_email.com'); // Invalid email
      SigninPage.typePassword(password);
      SigninPage.clickSignin();
  
      // Verifikasi pesan error
      cy.contains('Please enter a valid email address (Ex: johndoe@domain.com).')
        .should('be.visible');
    });
  
    it('TC-003: Sign in with unregistered email', function () {
      const { password } = this.loginData.inputLogin;
  
      SigninPage.typeEmail('pandamerah@spicysoda.com');
      SigninPage.typePassword(password);
      SigninPage.clickSignin();
  
      // Verifikasi pesan kesalahan
      cy.contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.').should('be.visible');
    });

    it('TC-004: Sign in with invalid password', function () {
      const { email } = this.loginData.inputLogin;
  
      SigninPage.typeEmail(email);
      SigninPage.typePassword('WrongPass123');
      SigninPage.clickSignin();
  
      // Verifikasi pesan error
      cy.contains(
        'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.'
      ).should('be.visible');
    });
  
    it('TC-005: Sign in with blank fields', () => {
      SigninPage.clickSignin();
  
      // Verify error messages
      SigninPage.verifyEmailErrorMessage('This is a required field.');
      SigninPage.verifyPasswordErrorMessage('This is a required field.');
    });

    it.only('TC-013: User successfully sign out', function () {
      const { email, password } = this.loginData.inputLogin;
  
      SigninPage.typeEmail(email);
      SigninPage.typePassword(password);
      SigninPage.clickSignin();

      // Sign Out 
      cy.get('.customer-welcome > .customer-name').first().click();  // Open dropdown
      cy.contains('Sign Out', { timeout: 8000 }).click({ force: true });
     
      cy.contains('You are signed out').should('be.visible'); 
      cy.wait(6000);
      cy.url().should('eq', 'https://magento.softwaretestingboard.com/');
    });

    it('TC-014: User forgot password', () => {
      // Navigate to the login page
      cy.visit(`${baseUrl}/customer/account/login`);
      cy.contains('Forgot Your Password?').click(); // Click "Forgot Password"
      cy.url().should('include', '/customer/account/forgotpassword'); // Verify Forgot Password URL
  
      // Input email and submit the form
      cy.get('#email_address').type('testmail@gimpmail.com');
      cy.get('.action.submit.primary').click();
  
      // Verify success message
      cy.contains(
        'If there is an account associated with testmail@gimpmail.com you will receive an email with a link to reset your password.'
      ).should('be.visible');
    });

    it('TC-015: Test XSS vulnerability in input fields', () => {
      const xssPayload = '<script>alert("XSS")</script>';
  
      SigninPage.typeEmail(xssPayload); 
      SigninPage.typePassword(xssPayload);
      SigninPage.clickSignin();
  
      // Pastikan payload XSS tidak dieksekusi
      cy.contains('Please enter a valid email address').should('be.visible');
    });
  });
  