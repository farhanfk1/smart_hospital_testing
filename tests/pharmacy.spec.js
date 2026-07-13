const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/loginpage");
const PharmacyPage = require("../pages/pharmacypage");
const loginData = require("../test-data/loginData")

const allowUsers = loginData.filter((user) =>
  ["Super Admin", "Admin", "Pharmacist",].includes(user.role),
);

  allowUsers.forEach((user) => {
  test(`Generate Pharmacy Bill - ${user.role}`, async ({ page }) => {
   

    const login = new LoginPage(page);
    const pharmacy = new PharmacyPage(page);

    await login.open();
    await login.selectRole(user.role);
    await login.login();

    await pharmacy.openPharmacy();

    await pharmacy.clickGenerateBill();

    await pharmacy.selectPatient();

    await pharmacy.selectMedicineCategory();

    await pharmacy.selectMedicine();

    await pharmacy.selectBatch();

    await pharmacy.enterQuantity();

    await pharmacy.enterDiscount();

    await pharmacy.saveBill();

    await expect(page).toHaveURL(/admin\/pharmacy\/bill/);
  });
});
