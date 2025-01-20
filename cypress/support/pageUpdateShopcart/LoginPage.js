class LoginPage {
  visitLoginPage(baseUrl) {
    cy.visit(`${baseUrl}/customer/account/login/`);
  }

  enterEmail(email) {
    cy.get("#email").type(email);
  }

  enterPassword(password) {
    cy.get("#pass").type(password);
  }

  clickLoginButton() {
    cy.get("#send2").click();
  }

  verifyLoginSuccess() {
    cy.url().should("include", "/customer/account");
    cy.contains("Welcome").should("be.visible");
  }
}

export default LoginPage;
