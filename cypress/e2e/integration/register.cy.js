
function generateRandomEmail(domain = "vomoto.com") {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const emailLength = 10;
  let randomPart = "";

  for (let i = 0; i < emailLength; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${randomPart}@${domain}`;
}

describe('Customer Registration Tests', () => {
  const baseUrl = 'https://magento.softwaretestingboard.com/customer/account/create/';
  const existingEmail = 'rio@vomoto.com'
  const randomEmail = generateRandomEmail();


  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Successful Registration', () => {
    cy.get('#firstname').type('Rio');
    cy.get('#lastname').type('Ramadhan');
    cy.get('#email_address').type(randomEmail); // Email tetap
    cy.get('#password').type('Password123!');
    cy.get('#password-confirmation').type('Password123!');
    cy.get('.action.submit.primary').click();

    // Verifikasi registrasi berhasil
    cy.contains('Thank you for registering with Main Website Store.').should('be.visible');
  });

  it('Registration with Existing Email', () => {
    cy.get('#firstname').type('Rio');
    cy.get('#lastname').type('Ramadhan');
    cy.get('#email_address').type(existingEmail); // Email sudah terdaftar
    cy.get('#password').type('Password123!');
    cy.get('#password-confirmation').type('Password123!');
    cy.get('.action.submit.primary').click();

    // Verifikasi email sudah terdaftar
    cy.contains('There is already an account with this email address').should('be.visible');
  });

  it('Registration with Missing First Name', () => {
    cy.get('#lastname').type('Ramadhan');
    cy.get('#email_address').type(randomEmail);
    cy.get('#password').type('Password123!');
    cy.get('#password-confirmation').type('Password123!');
    cy.get('.action.submit.primary').click();

    // Verifikasi error First Name
    cy.get('.field-name-firstname .mage-error').should('contain', 'This is a required field');
  });

  it('Registration with Invalid Email Format', () => {
    cy.get('#firstname').type('Rio');
    cy.get('#lastname').type('Ramadhan');
    cy.get('#email_address').type('invalid-email-format');
    cy.get('#password').type('Password123!');
    cy.get('#password-confirmation').type('Password123!');
    cy.get('.action.submit.primary').click();

    // Verifikasi format email tidak valid
    cy.get('.field .mage-error').should('contain', 'Please enter a valid email address');
  });

  it('Registration with Password Mismatch', () => {
    cy.get('#firstname').type('Rio');
    cy.get('#lastname').type('Ramadhan');
    cy.get('#email_address').type(existingEmail);
    cy.get('#password').type('Password123!');
    cy.get('#password-confirmation').type('DifferentPassword!');
    cy.get('.action.submit.primary').click();

    // Verifikasi konfirmasi password salah
    cy.contains('Please enter the same value again.').should('be.visible');
  });

  it('Registration with Weak Password', () => {
    cy.get('#firstname').type('Rio');
    cy.get('#lastname').type('Ramadhan');
    cy.get('#email_address').type(randomEmail);
    cy.get('#password').type('weakpassword');
    cy.get('#password-confirmation').type('weakpassword');
    cy.get('.action.submit.primary').click();

    // Verifikasi password lemah
    cy.contains('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters').should('be.visible');
  });

  it('Verify Required Fields Highlight', () => {
    // Klik tombol submit tanpa mengisi form
    cy.get('.action.submit.primary').click();
  
    // Verifikasi semua field wajib diisi
    cy.get('#firstname-error').should('contain', 'This is a required field'); // Perbaikan typo pada ID 'firstname'
    cy.get('#lastname-error').should('contain', 'This is a required field');
    cy.get('#email_address-error').should('contain', 'This is a required field'); // Perbaikan ID untuk email
    cy.get('#password-error').should('contain', 'This is a required field');
    cy.get('#password-confirmation-error').should('contain', 'This is a required field'); // Menambahkan '#' untuk ID
  });
  
});
