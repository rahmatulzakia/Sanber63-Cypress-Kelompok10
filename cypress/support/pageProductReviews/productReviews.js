class productReviews{
    visit() {
        cy.visit('https://magento.softwaretestingboard.com/'); // Mengarahkan ke halaman login
    }

    inputEmail(emailValid) {
        cy.get("#email").type(emailValid);
    }

    inputPassword(passwordValid) {
        cy.get("#pass").type(passwordValid);
    }
    
    clickLoginButton() {
        cy.get("#send2").click();
    }
    
    successLogin(emailValid, passwordValid) {
        this.inputEmail(emailValid);
        this.inputPassword(passwordValid);
        this.clickLoginButton();
    }
}
export default productReviews;