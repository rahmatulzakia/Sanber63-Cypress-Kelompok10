describe("Update Shopping Cart Tests", () => {
  const baseUrl = "https://magento.softwaretestingboard.com";
  const email = "dummy-nanaz@robot-mail.com";
  const password = "@Dummynanaz";

  beforeEach(() => {
    // Login sebelum setiap test
    cy.visit(`${baseUrl}/customer/account/login/`);
    cy.get("#email").type(email);
    cy.get("#pass").type(password);
    cy.get("#send2").click();
    cy.url().should("include", "/customer/account");
    cy.contains("Welcome").should("be.visible");
  });

  // TC-001: Update quantity with valid input
  it("User can update product quantity with valid input", () => {
    cy.get(".showcart").click(); // Buka halaman keranjang

    // Update jumlah produk
    cy.get(".details-qty.qty input").first().clear().type("2"); // Ubah jumlah produk menjadi 4
    cy.get("button.update-cart-item").first().click({ force: true }); // Klik tombol update

    // Verifikasi ikon keranjang
    cy.get(".counter-number").should("be.visible").and("contain", "2");
  });

  // TC-002: Verifikasi user tidak dapat mengubah jumlah produk menjadi 0.
  it("User cannot update product quantity to zero", () => {
    cy.get(".showcart").click(); // Buka halaman keranjang

    // Ubah jumlah produk menjadi 0
    cy.get(".details-qty.qty input").first().clear().type("0"); // Input jumlah produk 0

    // Verifikasi bahwa tombol Update Shopping Cart tidak terlihat
    cy.get("button.update-cart-item").first().should("not.be.visible"); // Tombol update tidak muncul

    // Verifikasi subtotal tetap tidak berubah
    cy.get(".price-wrapper > .price")
      .first()
      .then(($subtotal) => {
        const initialSubtotal = parseFloat($subtotal.text().replace("$", "")); // Simpan subtotal awal
        cy.get(".price-wrapper > .price").should(($updatedSubtotal) => {
          const updatedSubtotal = parseFloat(
            $updatedSubtotal.text().replace("$", "")
          );
          expect(updatedSubtotal).to.equal(initialSubtotal); // Subtotal tetap sama
        });
      });

    // Verifikasi ikon keranjang tetap tidak berubah
    cy.get(".counter-number").should("be.visible").and("not.contain", "0"); // Ikon keranjang tidak menunjukkan angka 0
  });

  // TC-003: Verifikasi user tidak dapat mengubah jumlah produk menjadi angka negatif
  it("User cannot update product quantity to a negative value", () => {
    cy.get(".showcart").click(); // Buka halaman keranjang

    // Ubah jumlah produk menjadi angka negatif
    cy.get(".details-qty.qty input").first().clear().type("-1"); // Input jumlah produk -1

    // Verifikasi bahwa tombol Update Shopping Cart tidak terlihat
    cy.get("button.update-cart-item").first().should("not.be.visible"); // Tombol update tidak muncul

    // Verifikasi subtotal tetap tidak berubah
    cy.get(".price-wrapper > .price")
      .first()
      .then(($subtotal) => {
        const initialSubtotal = parseFloat($subtotal.text().replace("$", "")); // Simpan subtotal awal
        cy.get(".price-wrapper > .price").should(($updatedSubtotal) => {
          const updatedSubtotal = parseFloat(
            $updatedSubtotal.text().replace("$", "")
          );
          expect(updatedSubtotal).to.equal(initialSubtotal); // Subtotal tetap sama
        });
      });

    // Verifikasi ikon keranjang tetap tidak berubah
    cy.get(".counter-number").should("be.visible").and("not.contain", "-1"); // Ikon keranjang tidak menunjukkan angka negatif
  });

  // TC-004: Verifikasi user tidak dapat mengubah jumlah produk dengan input non-numerik!
  it("User cannot update product quantity with non-numeric input", () => {
    cy.get(".showcart").click(); // Buka halaman keranjang

    // Ubah jumlah produk menjadi input non-numerik
    cy.get(".details-qty.qty input").first().clear().type("abc"); // Input non-numerik "abc"

    // Verifikasi bahwa input tidak menerima nilai non-numerik
    cy.get(".details-qty.qty input").first().should("have.value", ""); // Field tetap kosong

    // Verifikasi bahwa tombol Update Shopping Cart tidak terlihat
    cy.get("button.update-cart-item").first().should("not.be.visible"); // Tombol update tidak muncul

    // Verifikasi subtotal tetap tidak berubah
    cy.get(".price-wrapper > .price")
      .first()
      .then(($subtotal) => {
        const initialSubtotal = parseFloat($subtotal.text().replace("$", "")); // Simpan subtotal awal
        cy.get(".price-wrapper > .price").should(($updatedSubtotal) => {
          const updatedSubtotal = parseFloat(
            $updatedSubtotal.text().replace("$", "")
          );
          expect(updatedSubtotal).to.equal(initialSubtotal); // Subtotal tetap sama
        });
      });

    // Verifikasi ikon keranjang tetap tidak berubah
    cy.get(".counter-number").should("be.visible"); // Ikon keranjang tetap valid
  });

  // TC-005: Verifikasi detail produk muncul ketika tombol "See Details" diklik
  it("User can view product details when clicking 'See Details'", () => {
    cy.get(".showcart").click(); // Klik ikon keranjang
    cy.wait(2000); // Tunggu elemen muncul

    // Klik tombol See Details
    cy.contains("See Details").click();

    // Verifikasi elemen detail produk (size, color, harga) terlihat
    cy.get(".content > .product").should("be.visible"); // Detail produk terlihat
    cy.get(".content > .product").within(() => {
      // Verifikasi size
      cy.contains("Size").should("be.visible"); // Contoh size

      // Verifikasi color
      cy.contains("Color").should("be.visible"); // Contoh color
    });
  });

  // TC-006: Verifikasi user dapat melanjutkan ke halaman checkout dengan produk di keranjang.
  it("User can proceed to checkout with items in the cart", () => {
    // Klik ikon keranjang untuk membuka dialog
    cy.get(".showcart").click();
    cy.wait(3000);
    // Klik tombol "Proceed to Checkout"
    cy.get("#top-cart-btn-checkout").click();
    cy.wait(3000);
    // Verifikasi user diarahkan ke halaman checkout
    cy.url().should("include", "/checkout"); // Verifikasi URL halaman checkout

    // Verifikasi elemen unik di halaman checkout
    cy.get("#checkout").should("be.visible"); // Verifikasi bagian pengiriman
    cy.contains("Shipping Address").should("be.visible"); // Verifikasi teks "Shipping Address" muncul
  });

  // TC-007: Verifikasi user dapat melihat dan mengedit keranjang dengan produk di dalamnya
  it("User can view and edit the cart with items", () => {
    // Klik ikon keranjang
    cy.get(".showcart").click();
    cy.wait(3000);
    // Klik tombol "View and Edit Cart"
    cy.contains("View and Edit Cart").click();
    // Verifikasi URL diarahkan ke halaman keranjang
    cy.url().should("include", "/checkout/cart/");

    // Verifikasi elemen keranjang terlihat
    cy.get(".cart-container").should("be.visible"); // Keranjang terlihat
    cy.get(".item").should("have.length.greaterThan", 0); // Ada produk di keranjang

    // Verifikasi informasi produk terlihat
    cy.get(".product-item-name").should("be.visible"); // Nama produk terlihat
    // Verifikasi jumlah produk di keranjang
    cy.get(".col.qty input")
      .invoke("val")
      .then((value) => {
        cy.log("Jumlah produk di keranjang: " + value); // Log nilai untuk debugging
        expect(Number(value)).to.be.greaterThan(0); // Pastikan jumlah produk lebih dari 0
      });
  });

  //TC-008: Verifikasi user membatalkan konfirmasi penghapusan produk dari keranjang belanja.
  it("User cancels product removal confirmation from the cart", () => {
    // Klik ikon keranjang
    cy.get(".showcart").click(); // Buka dialog keranjang
    cy.wait(2000); // Tunggu elemen muncul

    // Klik tombol hapus produk
    cy.get("a.action.delete").first().click(); // Klik ikon delete produk pertama

    // Tangani dialog konfirmasi
    cy.on("window:confirm", (text) => {
      expect(text).to.equal("Are you sure you would like to remove this item?"); // Verifikasi teks dialog
      return false; // Klik "Cancel"
    });

    // Klik tombol Cancel di dialog konfirmasi
    cy.get(".action-secondary").click(); // Klik tombol konfirmasi "Cancel"

    // Tunggu dialog tertutup
    cy.wait(1000);

    // Verifikasi bahwa produk tetap ada di keranjang
    cy.get(".product-item-name").should("have.length.greaterThan", 0); // Produk masih ada di keranjang

    // Verifikasi subtotal tidak berubah
    cy.get(".price-wrapper > .price")
      .invoke("text")
      .then((subtotalTextBefore) => {
        cy.log("Subtotal sebelum konfirmasi batal: " + subtotalTextBefore);
        // Verifikasi subtotal tetap sama
        cy.get(".price-wrapper > .price")
          .invoke("text")
          .should((subtotalTextAfter) => {
            expect(subtotalTextAfter).to.equal(subtotalTextBefore); // Subtotal tidak berubah
          });
      });
  });
  // TC-009: user Verifikasi user dapat menghapus produk dari keranjang belanja.
  it("User can remove product from cart", () => {
    cy.get(".showcart").click(); // Buka dialog keranjang

    // Klik tombol hapus produk
    cy.get("a.action.delete").first().click(); // Klik ikon delete produk pertama

    // Tangani dialog konfirmasi
    cy.on("window:confirm", (text) => {
      expect(text).to.equal("Are you sure you would like to remove this item?"); // Verifikasi teks dialog
      return true; // Klik "OK"
    });

    // Klik tombol OK di dialog konfirmasi
    cy.get(".action-primary").click(); // Klik tombol konfirmasi "OK"

    // Tunggu proses penghapusan selesai
    cy.wait(3000);

    // Verifikasi pesan keranjang kosong menggunakan #ui-id-1
    cy.get("#ui-id-1")
      .should("be.visible")
      .and("contain", "You have no items in your shopping cart.");

    // Verifikasi subtotal tidak ada lagi
    cy.get(".price-wrapper > .price").should("not.exist");
  });

  // TC-010: Verifikasi user tidak dapat melanjutkan ke halaman checkout jika keranjang kosong
  it("User cannot proceed to checkout with an empty cart", () => {
    // Pastikan keranjang kosong
    cy.visit(`${baseUrl}/checkout/cart/`);
    cy.get(".cart-empty")
      .should("be.visible")
      .and("contain", "You have no items in your shopping cart.");

    // Klik ikon keranjang
    cy.get(".showcart").click();

    // Verifikasi tombol "Proceed to Checkout" tidak ada atau tidak aktif
    // cy.get("button[title='Proceed to Checkout']").should("not.exist");
    cy.get("#top-cart-btn-checkout").should("not.exist");

    // Verifikasi pesan di dialog keranjang kosong
    cy.get("#ui-id-1")
      .should("be.visible")
      .and("contain", "You have no items in your shopping cart.");
  });

  // TC-011: Verifikasi user tidak dapat melihat dan mengedit keranjang jika keranjang kosong
  it("User cannot view and edit the cart if the cart is empty", () => {
    // Pastikan keranjang kosong
    cy.visit(`${baseUrl}/checkout/cart/`);
    cy.get(".cart-empty")
      .should("be.visible")
      .and("contain", "You have no items in your shopping cart.");

    // Klik ikon keranjang untuk membuka dialog
    cy.get(".showcart").click();

    // Verifikasi tombol "View and Edit Cart" tidak ada atau tidak aktif
    cy.contains("View and Edit Cart").should("not.exist");

    // Verifikasi pesan di dialog keranjang kosong
    cy.get("#ui-id-1")
      .should("be.visible")
      .and("contain", "You have no items in your shopping cart.");
  });
});
