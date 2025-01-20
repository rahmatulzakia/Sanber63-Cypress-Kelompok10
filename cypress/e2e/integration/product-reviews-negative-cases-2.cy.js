describe('Product Reviews - Negative Cases 2', () => {
    const baseUrl = 'https://magento.softwaretestingboard.com/';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get('.panel > .header > .authorization-link > a').click();
        cy.get('#email').type('stella123@hahamail.com');
        cy.get('#pass').type('stella123@');
        cy.get('#send2').click();
    });

    // TC-029
    it('Failed add review - only fill nickname field (change nickname)', () => {
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Only filled nickname
        cy.get('#nickname_field').clear().type('Sabila');
        cy.get('.actions-primary > .action').click();
        // Validate error message appear
        cy.contains('Please select one of each of the ratings above.').should('be.visible');
        cy.get('#summary_field-error').should('be.visible', 'This is a required field.');
        cy.get('#review_field-error').should('be.visible', 'This is a required field.');
    });

    // TC-030
    it('Failed add review - only fill summary field', () => {
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(5) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Only filled nickname
        cy.get('#nickname_field').clear();
        cy.get('#summary_field').type('good bag');
        cy.get('.actions-primary > .action').click();
        // Validate error message appear
        cy.contains('Please select one of each of the ratings above.').should('be.visible');
        cy.get('#nickname_field-error').should('be.visible', 'This is a required field.');
        cy.get('#review_field-error').should('be.visible', 'This is a required field.');
    });

    // TC-031
    it('Failed add review - only fill review field', () => {
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(5) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Only filled nickname
        cy.get('#nickname_field').clear();
        cy.get('#review_field').type('I have been using this bag for 10 years and its waterproof bag');
        cy.get('.actions-primary > .action').click();
        // Validate error message appear
        cy.contains('Please select one of each of the ratings above.').should('be.visible');
        cy.get('#nickname_field-error').should('be.visible', 'This is a required field.');
        cy.get('#summary_field-error').should('be.visible', 'This is a required field.');
    });
});