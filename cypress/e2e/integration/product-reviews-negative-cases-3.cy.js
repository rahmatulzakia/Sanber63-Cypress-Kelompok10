describe('Product Reviews - Negative Cases 3', () => {
    const baseUrl = 'https://magento.softwaretestingboard.com/';

    beforeEach(() => {
        cy.visit(baseUrl);
    });

    // TC-032
    it('Blank Field', () => {
        cy.get('.panel > .header > .authorization-link > a').click();
        cy.get('#email').type('stella123@hahamail.com');
        cy.get('#pass').type('stella123@');
        cy.get('#send2').click();
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Only filled nickname
        cy.get('#nickname_field').clear();
        cy.get('.actions-primary > .action').click();
        // Validate error message appear
        cy.contains('Please select one of each of the ratings above.').should('be.visible');
        cy.get('#nickname_field-error').should('be.visible', 'This is a required field.');
        cy.get('#summary_field-error').should('be.visible', 'This is a required field.');
        cy.get('#review_field-error').should('be.visible', 'This is a required field.');
    });

    // TC-0026
    it('User failed to add a review - not logged in', () => {
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Fill product review data
        cy.get('#Rating_1_label').click({ force: true });
        cy.get('#nickname_field').type('Bila');
        cy.get('#summary_field').type('jelek');
        cy.get('#review_field').type('bahan tidak bagus');
        cy.get('.actions-primary > .action').click();
        // Validation 
        cy.contains('You submitted your review for moderation.').should('not.be.visible');
    });
});