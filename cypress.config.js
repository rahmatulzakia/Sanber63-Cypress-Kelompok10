const { defineConfig } = require('cypress');
const { install, task } = require('cypress-log-to-output');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com', // Base URL untuk semua tes
    defaultCommandTimeout: 8000, // Waktu tunggu default untuk perintah
    pageLoadTimeout: 30000, // Waktu tunggu untuk memuat halaman
    retries: {
      runMode: 2, // Ulangi 2 kali jika gagal saat `cypress run`
      openMode: 0, // Tidak ada pengulangan jika gagal saat `cypress open`
    },
    video: true, // Rekam video saat menjalankan tes
    screenshotOnRunFailure: true, // Ambil tangkapan layar jika tes gagal
    supportFile: false, // Nonaktifkan file dukungan default jika tidak diperlukan
    specPattern: 'cypress/e2e/**/*.cy.js', // Pola file spesifikasi untuk tes
    setupNodeEvents(on, config) {
      // Instal cypress-log-to-output untuk mencetak log ke terminal
      install(on, (type, event) => {
        if (type === 'error') {
          return true; // Tampilkan error log
        }
        return false;
      });

      // Tambahkan task log untuk mencetak ke terminal
      on('task', {
        logToTerminal(message) {
          console.log(message); // Cetak log ke terminal
          return null;
        },
      });

      return config;
    },
  },
});
