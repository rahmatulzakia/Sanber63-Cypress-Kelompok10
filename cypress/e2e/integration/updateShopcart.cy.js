import LoginPage from "../../support/pageUpdateShopcart/LoginPage";
import CartPage from "../../support/pageUpdateShopcart/CartPage";

describe("Update Shopping Cart Tests", () => {
  const loginPage = new LoginPage();
  const cartPage = new CartPage();

  let credentials;

  before(() => {
    // Load data from fixtures
    cy.fixture("data-nanacaw").then((data) => {
      credentials = data;
    });
  });

  beforeEach(() => {
    loginPage.visitLoginPage(credentials.baseUrl);
    loginPage.enterEmail(credentials.email);
    loginPage.enterPassword(credentials.password);
    loginPage.clickLoginButton();
    loginPage.verifyLoginSuccess();
  });

  // TC-001: Update quantity with valid input
  it("User can update product quantity with valid input", () => {
    cartPage.openCart();
    cartPage.updateQuantity(0, "2");
    cartPage.verifyCartIcon("2");
  });

  // TC-002: User cannot update product quantity to zero
  it("User cannot update product quantity to zero", () => {
    cartPage.openCart();
    cartPage.updateQuantity(0, "0");
    cartPage.verifySubtotalUnchanged();
    cartPage.verifyCartIcon("2");
  });

  // TC-003: User cannot update product quantity to a negative value
  it("User cannot update product quantity to a negative value", () => {
    cartPage.openCart();
    cartPage.updateQuantity(0, "-1");
    cartPage.verifySubtotalUnchanged();
    cartPage.verifyCartIcon("2");
  });

  // TC-004: User cannot update product quantity with non-numeric input
  it("User cannot update product quantity with non-numeric input", () => {
    cartPage.openCart();
    cy.get(".details-qty.qty input").first().clear().type("abc");
    cy.get(".details-qty.qty input").first().should("have.value", "");
    cy.get("button.update-cart-item").first().should("not.be.visible");
    cartPage.verifySubtotalUnchanged();
  });

  // TC-005: User can view product details when clicking 'See Details'
  it("User can view product details when clicking 'See Details'", () => {
    cartPage.openCart();
    cy.contains("See Details").click();
    cy.get(".content > .product").should("be.visible");
    cy.get(".content > .product").within(() => {
      cy.contains("Size").should("be.visible");
      cy.contains("Color").should("be.visible");
    });
  });

  // TC-006: User can proceed to checkout with items in the cart
  it("User can proceed to checkout with items in the cart", () => {
    cartPage.openCart();
    cy.wait(3000);
    cartPage.proceedToCheckoutAndVerify();
  });

  // TC-007: User can view and edit the cart with items
  it("User can view and edit the cart with items", () => {
    cartPage.openCart();
    cartPage.viewAndEditCart();
  });

  // TC-008: User cancels product removal confirmation from the cart
  it("User cancels product removal confirmation from the cart", () => {
    cartPage.openCart();
    cartPage.cancelRemoveProduct();
    cartPage.verifySubtotalUnchanged();
  });

  // TC-009: User can remove product from cart
  it("User can remove product from cart", () => {
    cartPage.openCart();
    cartPage.removeProduct();
    cy.wait(3000);
    cartPage.verifyEmptyCartMessage();
  });

  // TC-010: User cannot proceed to checkout with an empty cart
  it("User cannot proceed to checkout with an empty cart", () => {
    cy.visit(`${credentials.baseUrl}/checkout/cart/`);
    cartPage.openCart();
    cartPage.verifyEmptyCartMessage(); // Verifikasi keranjang kosong
    cy.get("#top-cart-btn-checkout").should("not.exist"); // Pastikan tombol checkout tidak ada
  });

  // TC-011: User cannot view and edit the cart if the cart is empty
  it("User cannot view and edit the cart if the cart is empty", () => {
    cy.visit(`${credentials.baseUrl}/checkout/cart/`);
    cartPage.openCart();
    cartPage.verifyEmptyCartMessage(); // Verifikasi keranjang kosong
    cy.contains("View and Edit Cart").should("not.exist"); // Verifikasi tombol "View and Edit Cart" tidak ada
  });
});
