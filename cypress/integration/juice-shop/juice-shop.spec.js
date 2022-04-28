import CreateAddressPage from "../../pageObjects/CreateAddressPage";
import HomePage from "../../pageObjects/HomePage";
import LoginPage from '../../pageObjects/LoginPage';
import RegistrationPage from "../../pageObjects/RegistrationPage";
import SavedAddressesPage from '../../pageObjects/SavedAddressesPage';
import SavedPaymentMethods from '../../pageObjects/SavedPaymentMethods';
import WalletPage from '../../pageObjects/WalletPage';
import WalletPaymentPage from '../../pageObjects/WalletPaymentPage';

describe("Juice-shop", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.dismissButton.click();
    HomePage.meWantItButton.click();
  });

  it("Registration", () => {
   // TODO: Implement me
   HomePage.accountButton.click();
   HomePage.loginButton.click();
   LoginPage.assertIsCurrentPage();
   LoginPage.notYetCustomer.click();
   RegistrationPage.assertIsCurrentPage();
   let email = "randomEmail" + Math.floor(Math.random() * 1000) + "@gmail.com"
   RegistrationPage.emailInput.type(email);
   RegistrationPage.passwordInput.type("RanDoMEh12736");
   RegistrationPage.passwordRepeatInput.type("RanDoMEh12736");
   RegistrationPage.securityQuestionField.click();
   RegistrationPage.securityQuestionFieldItems
      .contains("Mother's maiden name?")
      .click();
   RegistrationPage.securityAnswerField.type("someRandomAnswerDunno");
   RegistrationPage.registerButton.click();
   RegistrationPage.toastMessage.should("contain", "Registration completed successfully. You can now log in");

  });

  it("Login", () => {
    HomePage.accountButton.click();
    HomePage.loginButton.click();
    LoginPage.assertIsCurrentPage();
    LoginPage.emailInput.type("demo");
    LoginPage.passwordInput.type("demo");
    LoginPage.loginButton.click();
    HomePage.assertIsCurrentPage();
    HomePage.accountButton.click();
    HomePage.goToUserProfileButton.should("contain", "demo");
  });
});

  describe("Juice-shop", () => {
    beforeEach(() => {
      cy.login('demo','demo')
      HomePage.visit();
    });

    it("Login", () => {
      HomePage.accountButton.click();
      HomePage.goToUserProfileButton.should("contain","demo");
    
    });

    it("Search and validate Lemon", () => {
      // Search for lemon
      HomePage.searchButton.click();
      HomePage.searchInputField.type("Lemon{enter}");
      // Click on lemon
      HomePage.productCardName.contains('Lemon').click();
      // Validate = sour but full of vitamins.
      HomePage.productCardDialogBox.should(
        "contain",
        "Sour but full of vitamins"
      );
    });

    it("Search 500ml and validate Lemon", () => {
      //search for 500ml
      HomePage.searchButton.click();
      HomePage.searchInputField.type("500ml{enter}");
      //click on lemon
      HomePage.productCardName.contains('Lemon').click();
      //validate sour but full of vitamins
      HomePage.productCardDialogBox.should(
        "contain",
        "Sour but full of vitamins"
      );
    });

    it("Search 500ml and validate all cards", () => {
      //search for 500ml
      HomePage.searchButton.click();
      HomePage.searchInputField.type("500ml{enter}");
      HomePage.productCardName.contains('Lemon').click();
      HomePage.productCardDialogBox.should(
        "contain",
        "Sour but full of vitamins"
      );
      HomePage.productCardDialogBoxCloseButton.click();
      HomePage.productCardName.contains('Eggfruit').click();
      HomePage.productCardDialogBox.should(
        "contain",
        "Now with even more exotic flavour"
      );
      HomePage.productCardDialogBoxCloseButton.click();
      HomePage.productCardName.contains('Strawberry').click();
      HomePage.productCardDialogBox.should(
        "contain",
        "Sweet & tasty!"
      );

    });

    it("Read a review for King", () => {
      //open king card
      HomePage.productCardName.contains('King').click();
      // expand review area
      HomePage.reviewButton.wait(500).click();
      // validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!
      HomePage.comments.should(
        "contain",
        "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!"
      );
      
    });

    it("Add a review for Raspberry", () => {
      // Search for Raspberry
      HomePage.searchButton.click();
      HomePage.searchInputField.type("Raspberry{enter}");
      // Open Raspberry
      HomePage.productCardName.contains('Raspberry').click().wait(500);
      // Add review
      HomePage.reviewInputFields.type("Tastes like berry")
      HomePage.submitButton.click();
      // Validate review
      HomePage.reviewButton.wait(500).click();
      HomePage.comments.should("contain","Tastes like berry");
      
    });

    it("Add address", () => {+
      // click add new address
      SavedAddressesPage.visit();
      SavedAddressesPage.addNewAddressButton.click();
      CreateAddressPage.assertIsCurrentPage();
      // input all the necesary information
      CreateAddressPage.countryInput.type("USA");
      CreateAddressPage.nameInput.type("George");
      CreateAddressPage.mobileNumberInput.type("123456789");
      CreateAddressPage.zipCodeInput.type("34654");
      CreateAddressPage.addressInput.type("Some random Address in USA, Alaska");
      CreateAddressPage.cityInput.type("Sitka");
      CreateAddressPage.stateInput.type("Alaska");
      // Click submit
      CreateAddressPage.submitButton.click();
      // Validate toast message

      CreateAddressPage.toastMessage.should(
      "contain",
      'The address at Sitka has been successfully added to your addresses'
      );
      // Validate address
      SavedAddressesPage.rows
      .contains("USA")
      .should("contain", "Some random Address in USA, Alaska");
  });

     it("Add Payment option", () => {
      // open /#/saved-payment-methods
      SavedPaymentMethods.visit();
      SavedPaymentMethods.addNewCardButton.click();
      
      SavedPaymentMethods.cardInfoInput("Name").type("SomeRandomName");
      SavedPaymentMethods.cardInfoInput("Card Number").type("2351424224245151");
      SavedPaymentMethods.cardInfoMenuInput("Expiry Month").select("2");
      SavedPaymentMethods.cardInfoMenuInput("Expiry Year").select("2090");
      SavedPaymentMethods.submitButton.click();
      // Validate the new card
      SavedPaymentMethods.toastMessage.should(
        "contain",
        "Your card ending with 5151 has been saved for your convenience"
      );
      SavedPaymentMethods.rows
        .contains("SomeRandomName")
        .parent()
        .should("contain", "************5151");
    });

    it.only("Increase wallet Balance", () => {
      // Open digital wallet page,
      WalletPage.visit();
      // store the current
      WalletPage.walletBalance.should("be.visible").then((el)  => {
        cy.wrap(el.text()).as("startingValue");
      });
      // add 100
      WalletPage.amountInput.type("100");
      WalletPage.submitButton.click();
      WalletPaymentPage.assertIsCurrentPage();
      WalletPaymentPage.choosePaymentOption("Tim Tester");
      WalletPaymentPage.continueButton.click();
      WalletPaymentPage.toastMessage.should(
        "contain",
        "Wallet successfully charged"
      );
      WalletPage.assertIsCurrentPage();

      WalletPage.walletBalance.should("be.visible").then((el)  => {
        cy.get("@startingValue").then((startingValue) => {
          expect(parseFloat(el.text())).to.eq(
            parseFloat(startingValue) + addedValue
          );
        })
      });

    });
});