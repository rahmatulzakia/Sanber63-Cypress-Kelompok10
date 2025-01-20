class authPage {
    visit() {
      cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');
    }
  
    fillEmail(email) {
      cy.get('#email').type(email);
    }
  
    fillPassword(password) {
      cy.get('#pass').type(password);
    }
  
    submitLogin() {
      cy.get('#send2').click();
    }
  
    login(email, password) {
      this.visit();
      this.fillEmail(email);
      this.fillPassword(password);
      this.submitLogin();
      cy.wait(2000);
    }
  }
  
  export default new authPage();
  