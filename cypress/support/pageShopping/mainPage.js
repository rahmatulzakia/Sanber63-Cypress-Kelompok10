class mainPage {
  visit() {
    cy.visit('/');
  }

  clickLogo() {
    cy.get('.logo > img').click();
  }
}

export default new mainPage();
