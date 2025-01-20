class HomePage {
  visit() {
    cy.visit('/');
  }

  clickLogo() {
    cy.get('.logo > img').click();
  }
}

export default new HomePage();
