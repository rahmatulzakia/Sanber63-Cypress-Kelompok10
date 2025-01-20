import ProductReviews from '../../support/pageProductReviews/productReviews';
const productReviews = new ProductReviews();

describe('Product Reviews - Positive Cases 1', () => {
    beforeEach(() => {
        cy.fixture('data-sabila').as('userData'); 
        productReviews.visit();
        cy.get('.panel > .header > .authorization-link > a').click();

        cy.get('@userData').then((userData) => {
            const { dataLogin, inputs } = userData;

        productReviews.successLogin(dataLogin.email, dataLogin.password);
        });
    });

    // TC-023
    it('User can access product reviews section via hyperlink', () => {
        cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Validate if success access reviews page
        cy.contains('Customer Reviews').should('be.visible');
    });

    // TC-024
    it('User can add review by filling all the fields', () => {
        cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Fill product review data 1
        cy.get('#Rating_2_label').click({ force: true });
        cy.get('#summary_field').type('panas');
        cy.get('#review_field').type('its like saringan tahu');
        cy.get('.actions-primary > .action').click();
        // Validate success add review
        cy.contains('You submitted your review for moderation.').should('be.visible');

        // Fill product review data 2
        // Back to home
        cy.get('.logo > img').click();
        // Click 'reviews' hyperlink from product details
        cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-reviews-summary > .reviews-actions > .action > span').click();
        // Fill form with data 2
        cy.get('#Rating_5_label').click({ force: true });
        cy.get('#summary_field').type('nyaman');
        cy.get('#review_field').type('enak buat mantai');
        cy.get('.actions-primary > .action').click();
        // Validate success add review
        cy.contains('You submitted your review for moderation.').should('be.visible');
    });
});