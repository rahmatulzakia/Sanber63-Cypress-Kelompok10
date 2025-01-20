describe('Product Reviews - Negative Cases 1', () => {
    const baseUrl = 'https://magento.softwaretestingboard.com/';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get('.panel > .header > .authorization-link > a').click();
        cy.get('#email').type('stella123@hahamail.com');
        cy.get('#pass').type('stella123@');
        cy.get('#send2').click();
    });

    // TC-027
    it('Failed add review - only fill rating', () => {
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Fill only rating 3
        cy.get('#Rating_3_label').click({ force: true });
        cy.get('#nickname_field').clear();
        cy.get('.actions-primary > .action').click();
        // Validate error message appear
        cy.get('#nickname_field-error').should('be.visible', 'This is a required field.');
        cy.get('#summary_field-error').should('be.visible', 'This is a required field.');
        cy.get('#review_field-error').should('be.visible', 'This is a required field.');
        
        // Fill only rating 4
        // Back to home
        cy.get('.logo > img').click();
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        cy.get('#Rating_4_label').click({ force: true });
        cy.get('#nickname_field').clear();
        cy.get('.actions-primary > .action').click();
        // Validate error message appear
        cy.get('#nickname_field-error').should('be.visible', 'This is a required field.');
        cy.get('#summary_field-error').should('be.visible', 'This is a required field.');
        cy.get('#review_field-error').should('be.visible', 'This is a required field.');
    });

    // TC-028
    it('Failed add review - only fill nickname field (default)', () => {
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Only filled nickname
        cy.get('.actions-primary > .action').click();
        // Validate error message appear
        //cy.get('#ratings\[4\]-error').
        cy.contains('Please select one of each of the ratings above.').should('be.visible');
        cy.get('#summary_field-error').should('be.visible', 'This is a required field.');
        cy.get('#review_field-error').should('be.visible', 'This is a required field.');
    });
});