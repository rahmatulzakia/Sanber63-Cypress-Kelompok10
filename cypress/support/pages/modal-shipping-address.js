class ModalShippingAddress {
  // Lokator elemen
  firstNameInput = 'input.input-text[name="firstname"]';
  lastNameInput = 'input.input-text[name="lastname"]';
  companyInput = 'input.input-text[name="company"]';
  streetAddressLine1Input = 'input.input-text[name="street[0]"]';
  streetAddressLine2Input = 'input.input-text[name="street[1]"]';
  streetAddressLine3Input = 'input.input-text[name="street[2]"]';
  cityInput = 'input.input-text[name="city"]';
  stateDropdown = '.select[name="region_id"]';
  postalCodeInput = 'input.input-text[name="postcode"]';
  countryDropdown = '.select[name="country_id"]';
  phoneNumberInput = 'input.input-text[name="telephone"]';
  saveButton = '.action.primary.action-save-address';
  saveInAddressBookCheckbox = '#shipping-save-in-address-book';

  fillFormValid(address) {
    cy.get(this.firstNameInput).type(address.firstname);
    cy.get(this.lastNameInput).type(address.lastname);
    cy.get(this.companyInput).type(address.company);
    cy.get(this.streetAddressLine1Input).type(address.street1);
    cy.get(this.streetAddressLine2Input).type(address.street2);
    cy.get(this.streetAddressLine3Input).type(address.street3);
    cy.get(this.cityInput).type(address.city);
    cy.get(this.stateDropdown).select(address.state);
    cy.get(this.postalCodeInput).type(address.postcode);
    cy.get(this.countryDropdown).select(address.country);
    cy.get(this.phoneNumberInput).type(address.phone);
    cy.get(this.saveInAddressBookCheckbox).check();
  }

  fillFormCustom(address, isBlank) {
    if (isBlank.firstname) {
      cy.get(this.firstNameInput).clear();
    } else {
      cy.get(this.firstNameInput).type(address.firstname);
    }
  
    if (isBlank.lastname) {
      cy.get(this.lastNameInput).clear();
    } else {
      cy.get(this.lastNameInput).type(address.lastname);
    }
  
    if (isBlank.company) {
      cy.get(this.companyInput).clear();
    } else {
      cy.get(this.companyInput).type(address.company);
    }
  
    if (isBlank.street1) {
      cy.get(this.streetAddressLine1Input).clear();
    } else {
      cy.get(this.streetAddressLine1Input).type(address.street1);
    }
  
    if (isBlank.street2) {
      cy.get(this.streetAddressLine2Input).clear();
    } else {
      cy.get(this.streetAddressLine2Input).type(address.street2);
    }
  
    if (isBlank.street3) {
      cy.get(this.streetAddressLine3Input).clear();
    } else {
      cy.get(this.streetAddressLine3Input).type(address.street3);
    }
  
    if (isBlank.city) {
      cy.get(this.cityInput).clear();
    } else {
      cy.get(this.cityInput).type(address.city);
    }
  
    if (isBlank.state) {
      cy.get(this.stateDropdown).select('');
    } else {
      cy.get(this.stateDropdown).select(address.state);
    }
  
    if (isBlank.postcode) {
      cy.get(this.postalCodeInput).clear();
    } else {
      cy.get(this.postalCodeInput).type(address.postcode);
    }
  
    if (isBlank.country) {
      cy.get(this.countryDropdown).select('');
    } else {
      cy.get(this.countryDropdown).select(address.country);
    }
  
    if (isBlank.phone) {
      cy.get(this.phoneNumberInput).clear();
    } else {
      cy.get(this.phoneNumberInput).type(address.phone);
    }
  }
  

  clickSaveButton() {
    cy.get(this.saveButton).click();
  }
}

export default new ModalShippingAddress();
