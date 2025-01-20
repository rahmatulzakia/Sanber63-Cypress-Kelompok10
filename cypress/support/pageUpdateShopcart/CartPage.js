class CartPage {
  openCart() {
    cy.get(".showcart").click();
    cy.wait(2000); // Buka keranjang belanja
  }

  updateQuantity(index, quantity) {
    cy.get(".details-qty.qty input").eq(index).clear().type(quantity); // Perbarui kuantitas produk
    cy.get("button.update-cart-item").eq(index).click({ force: true }); // Klik tombol update
  }

  verifyCartIcon(quantity) {
    cy.get(".counter-number").should("be.visible").and("contain", quantity); // Verifikasi ikon keranjang
  }

  verifySubtotalUnchanged() {
    cy.get(".price-wrapper > .price")
      .first()
      .then(($subtotal) => {
        const initialSubtotal = parseFloat($subtotal.text().replace("$", ""));
        cy.get(".price-wrapper > .price").should(($updatedSubtotal) => {
          const updatedSubtotal = parseFloat(
            $updatedSubtotal.text().replace("$", "")
          );
          expect(updatedSubtotal).to.equal(initialSubtotal);
        });
      });
  }

  // Fungsi umum untuk menghapus produk dengan tombol yang dipilih (OK atau Cancel)
  removeProductWithAction(action) {
    cy.get("a.action.delete").first().click(); // Klik ikon delete produk pertama
    cy.on("window:confirm", (text) => {
      expect(text).to.equal("Are you sure you would like to remove this item?");
    });

    // Tentukan tindakan berdasarkan parameter 'action'
    if (action === "cancel") {
      cy.get(".action-secondary").click(); // Klik tombol Cancel
    } else if (action === "remove") {
      cy.get(".action-primary").click(); // Klik tombol OK
    }
  }

  // Fungsi untuk menghapus produk dengan konfirmasi
  removeProduct() {
    this.removeProductWithAction("remove"); // Panggil removeProductWithAction dengan aksi "remove"
  }

  // Fungsi untuk membatalkan penghapusan produk
  cancelRemoveProduct() {
    this.removeProductWithAction("cancel"); // Panggil removeProductWithAction dengan aksi "cancel"
  }

  proceedToCheckoutAndVerify() {
    cy.get("#top-cart-btn-checkout").click(); // Klik tombol Proceed to Checkout
    cy.url({ timeout: 10000 }).should("include", "/checkout"); // Verifikasi URL checkout
    cy.get("#checkout").should("be.visible"); // Verifikasi halaman checkout
    cy.wait(3000);
    cy.contains("Shipping Address").should("be.visible"); // Verifikasi alamat pengiriman
  }

  viewAndEditCart() {
    cy.contains("View and Edit Cart").click(); // Klik tombol "View and Edit Cart"
    cy.url().should("include", "/checkout/cart/"); // Verifikasi halaman keranjang
    cy.get(".cart-container").should("be.visible"); // Verifikasi elemen keranjang
  }

  // Menambahkan metode untuk verifikasi pesan keranjang kosong
  verifyEmptyCartMessage() {
    cy.get("#ui-id-1")
      .should("be.visible")
      .and("contain", "You have no items in your shopping cart.");
  }
}

export default CartPage;
