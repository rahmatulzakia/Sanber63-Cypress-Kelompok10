describe('Product Reviews - Positive Cases 2', () => {
    const baseUrl = 'https://magento.softwaretestingboard.com/';

    beforeEach(() => {
        cy.visit(baseUrl);
    });
    
    // TC-033
    it('User can access customer reviews section from hyperlink in product details page', () => {
        cy.get('.panel > .header > .authorization-link > a').click();
        cy.get('#email').type('stella123@hahamail.com');
        cy.get('#pass').type('stella123@');
        cy.get('#send2').click();
        // Click product name hyperlink from product details
        cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click();
        // Click "Reviews" hyperlink
        cy.get('.view > :nth-child(2)').click();
        cy.contains('Customer Reviews').should('be.visible');
    });

    // TC-034
    it('User can access review form section from hyperlink in product details page', () => {
        cy.get('.panel > .header > .authorization-link > a').click();
        cy.get('#email').type('stella123@hahamail.com');
        cy.get('#pass').type('stella123@');
        cy.get('#send2').click();
        // Click product name hyperlink from product details
        cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').click();
        // Click "Add Your Review" hyperlink
        cy.get('.add').click();
        cy.contains("You're reviewing:").should('be.visible');
    });

    // TC-035
    it('User can access review section by clicking hyperlink (not logged in)', () => {
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Validate if success access reviews page
        cy.contains('Customer Reviews').should('be.visible');
    });

    // TC-0025
    it('Check added review appear in customer reviews list', () => {
        cy.get('.panel > .header > .authorization-link > a').click();
        cy.get('#email').type('stella123@hahamail.com');
        cy.get('#pass').type('stella123@');
        cy.get('#send2').click();
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Fill product review data 1
        cy.get('#Rating_1_label').click({ force: true });
        cy.get('#nickname_field').clear().type('Bila');
        cy.get('#summary_field').type('jelek');
        cy.get('#review_field').type('bahan tidak bagus');
        cy.get('.actions-primary > .action').click();
        // Validate success add review
        cy.contains('You submitted your review for moderation.').should('be.visible');
        cy.get('#tab-label-reviews-title').click();
        // Check added review
        cy.contains('bahan tidak bagus', { timeout: 15000 }).should('be.visible');
    });
});