describe('choose product - without login', () => {
  const ProductURL = 'https://magento.softwaretestingboard.com/radiant-tee.html';

  beforeEach(() => {
    cy.visit(ProductURL); 
  });

  //case 1
  it('Without login  - User select size, color available and enters the qty, then click cart button - Positive case', () => {
    //Select size
    cy.get('div.swatch-attribute.size').contains('M').click();

    //Select Color
    //cy.get('.swatch-attribute.color').should('be.visible').contains('Blue').click();
    cy.get('[aria-label="Blue"]', { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .click();

    // enter qty
    cy.get('input#qty').clear().type('1'); 

    //click cart button
    cy.get('button#product-addtocart-button').click();

    //verifikasi message product berhasil ditambahkan ke cart
    cy.get('div.message-success').should('contain', 'You added Radiant Tee to your shopping cart.');
  });

  //case 2
  it('Without login - User selects the size without selecting the color, and enters the qty, then click cart button - negative case', () => {
    // Select size
    cy.get('div.swatch-attribute.size')
      .contains('M')
      .click();

    // enter qty
    cy.get('input#qty').clear().type('2'); 

    // click cart button
    cy.get('button#product-addtocart-button').click();
    cy.contains('This is a required field.', { timeout: 15000 }).should('be.visible');

    // Verifikasi message error 
    //cy.get('#super_attribute[93]-error') 
      //.should('exist')  
      //.should('be.visible')
      //.and('contain', 'This is a required field.');
  });

  //case 3
  it('Without login - User selects the color without selecting the size, and enters the quantity, then click cart button - negative case', () => {
    // Select color
    //cy.get('div.swatch-attribute.color')
   // .contains('Blue')
    //.click();
    cy.get('[aria-label="Blue"]', { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .click();

    // enter qty
    cy.get('input#qty').clear().type('2'); 

    // click cart button
    cy.get('button#product-addtocart-button').click();
    cy.contains('This is a required field.', { timeout: 15000 }).should('be.visible');

    // Verifikasi message error 
    //cy.get('#super_attribute\[143\]-error')
      //.should('exist')
      //.should('be.visible')
      //.and('contain', 'This is a required field.');
  });

  //case 4
  it('Without login - User selects the size, color, and enters the qty "0", then click cart button - negative case', () => {
    // Select size
    cy.get('div.swatch-attribute.size')
      .contains('M') // Ganti 'M' dengan ukuran lain jika diperlukan
      .click();


    // select color
    cy.get('[aria-label="Blue"]', { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .click();

    // Enter qty "0"
    cy.get('input#qty').clear().type('0');

    // click cart button
    cy.get('button#product-addtocart-button').click();
    cy.contains('Please enter a quantity greater than 0.', { timeout: 15000 }).should('be.visible');
  });
  
  //case 5
  it('Without login - User does not choose the size and color, then click cart button - negative case', () => {
    // tidak memilih ukuran dan warna

    // click cart button
    cy.get('button#product-addtocart-button').click();
    cy.contains('This is a required field.', { timeout: 15000 }).should('be.visible');
  });
  
  //case 6
  it('Without login - User does not choose size, and color,and enters the qty number "0" then click cart button - negative case', () => {
    //tidak memilih ukuran dan warna

    // Enter qty "0"
    cy.get('input#qty').clear().type('0');

    //click cart button
    cy.get('button#product-addtocart-button').click();
    cy.contains('This is a required field.', { timeout: 15000 }).should('be.visible');
    cy.contains('Please enter a quantity greater than 0.', { timeout: 15000 }).should('be.visible');
  });

  //case 7
  it('Without login - User selects the size and color of the available product, enters the quantity > stock, then clicks the cart button', () => {
  // Select size
  cy.get('div.swatch-attribute.size')
    .contains('M') // Ganti 'M' dengan ukuran lain jika diperlukan
    .click();

    // select color
    cy.get('[aria-label="Blue"]', { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .click();

    // enter qty
    cy.get('input#qty').clear().type('100000');

    //click cart button
    cy.get('button#product-addtocart-button').click();
    cy.contains('The maximum you may purchase is 10000.', { timeout: 15000 }).should('be.visible');
  });

  //case 8
  it('Without login - User add product to wishlist', () => {
    // Select size
  cy.get('div.swatch-attribute.size')
  .contains('M') // Ganti 'M' dengan ukuran lain jika diperlukan
  .click();

  // select color
  cy.get('[aria-label="Blue"]', { timeout: 10000 })
  .should('exist')
  .should('be.visible')
  .click();

  // enter qty
  cy.get('input#qty').clear().type('2');
  
  //click add to wishlist
  cy.get('.towishlist').click();
  //cy.visit(wishlistURL);
  });
});
