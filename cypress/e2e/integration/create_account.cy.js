import createAccount from "../../support/createAccount";

function generateRandomEmail(domain = "spicysoda.com") {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const emailLength = 10;
    let randomPart = "";
  
    for (let i = 0; i < emailLength; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return `${randomPart}@${domain}`;
  }
  
  describe('Magento Create Account Automation Tests', () => {
    const baseUrl = 'https://magento.softwaretestingboard.com/customer/account/create/';
    const existingEmail = 'user2@spicysoda.com'
    const randomEmail = generateRandomEmail();
  
    beforeEach(() => {
      cy.visit(baseUrl);
      cy.fixture('data_putri').as('accountData');
      cy.get('body').should('not.be.empty');
    });
  
    it('TC-006: Create account with valid data', function () {
      const { firstName, lastName, password } = this.accountData.inputLogin;
  
      createAccount.enterFirstName(firstName);
      createAccount.enterLastName(lastName);
      createAccount.enterEmail(randomEmail);
      createAccount.enterPassword(password);
      createAccount.confirmPassword(password);
      createAccount.clickCreateAccount();
      createAccount.verifySuccessMessage();
      cy.url().should('include', '/customer/account/');
    });

    it('TC-007: Create account with blank fields', () => {
      createAccount.clickCreateAccount();
      createAccount.verifyValidationError('#firstname-error', 'This is a required field');
      createAccount.verifyValidationError('#lastname-error', 'This is a required field');
      createAccount.verifyValidationError('#email_address-error', 'This is a required field');
      createAccount.verifyValidationError('#password-error', 'This is a required field');
      createAccount.verifyValidationError('#password-confirmation-error', 'This is a required field');
    });

    it('TC-008: Create account with password not meeting character requirements', function () {
      const { firstName, lastName } = this.accountData.inputLogin;
      
      createAccount.enterFirstName(firstName);
      createAccount.enterLastName(lastName);
      createAccount.enterEmail(randomEmail);
      createAccount.enterPassword('asdfghjk'); // Password tidak memenuhi syarat
      createAccount.confirmPassword('asdfghjk');
      createAccount.clickCreateAccount();

      cy.contains(
        'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.'
      ).should('be.visible');
    });

    it('TC-009: Create account with password less than minimum length', function () {
      const { firstName, lastName } = this.accountData.inputLogin;

      createAccount.enterFirstName(firstName);
      createAccount.enterLastName(lastName);
      createAccount.enterEmail(randomEmail);
      createAccount.enterPassword('123'); // Password terlalu pendek
      createAccount.confirmPassword('123');
      createAccount.clickCreateAccount();
  
      cy.contains(
        'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.'
      ).should('be.visible');
    });

    it('TC-010: Create account with unmatched password', function () {
      const { firstName, lastName, password } = this.accountData.inputLogin;

      createAccount.enterFirstName(firstName);
      createAccount.enterLastName(lastName);
      createAccount.enterEmail(randomEmail);
      createAccount.enterPassword(password);
      createAccount.confirmPassword('@123Abcde'); // Password tidak cocok
      createAccount.clickCreateAccount();
  
      cy.contains('Please enter the same value again.').should('be.visible');
    });
  
    it('TC-011: Create account with invalid email', function () {
      const { firstName, lastName, password } = this.accountData.inputLogin;

      createAccount.enterFirstName(firstName);
      createAccount.enterLastName(lastName);
      createAccount.enterEmail('gmail.com'); // Email tidak valid
      createAccount.enterPassword(password);
      createAccount.confirmPassword(password);
      createAccount.clickCreateAccount();
  
      cy.contains('Please enter a valid email address (Ex: johndoe@domain.com).').should('be.visible');
    });  
    
    it('TC-012: Create account with already registered email',function () {
      const { email, firstName, lastName, password } = this.accountData.inputLogin;

      createAccount.enterFirstName(firstName);
      createAccount.enterLastName(lastName);
      createAccount.enterEmail(email); // Email sudah terdaftar
      createAccount.enterPassword(password);
      createAccount.confirmPassword(password);
      createAccount.clickCreateAccount();
    
      cy.contains(
        'There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.'
      ).should('be.visible');
    });
  });