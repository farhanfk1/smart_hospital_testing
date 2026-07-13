const { expect } = require("@playwright/test");

class PharmacyPage {
  constructor(page) {
    this.page = page;

    // Menu
   this.pharmacyMenu = page.locator(
     "//span[normalize-space()='Pharmacy']/parent::a",
   );

    // Generate Bill
    this.generateBillBtn = page.getByRole("button", {
      name: /Generate Bill/,
    });

    // Patient
    this.patientDropdown = page
      .locator("#bill")
      .getByLabel("", { exact: true });
    this.searchInput = page.locator("input[type='search']").last();
    this.select2Options = page.locator("li.select2-results__option");

    // Medicine
    this.medicineCategory = page.locator(
      "span[id^='select2-medicine_category_id_1'][id$='container']",
    );

    this.medicineName = page.locator("#select2-medicine_name1-container");

    this.batchNo = page.locator("#select2-batch_no1-container");

    // Quantity
    this.quantity = page.locator("#quantity1");

    // Available Qty
    this.availableQty = page.locator("#totalqty1");

    // Discount
    this.discount = page.locator("#mdiscount1");

    // Save
    this.saveBtn = page.locator("#billsave");
  }

  async openPharmacy() {
    await this.pharmacyMenu.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickGenerateBill() {
    await this.generateBillBtn.click();
  }

  async selectPatient() {
    const letters = ["a", "e", "s", "t", "x"];

    for (const letter of letters) {
      await this.patientDropdown.click();

      await this.searchInput.fill(letter);

      await this.page.waitForTimeout(800);

      const count = await this.select2Options.count();

      if (count > 0) {
        await this.select2Options.first().click();
        return;
      }
    }

    throw new Error("No Patient Found");
  }

  async selectMedicineCategory() {
    await this.medicineCategory.click();
    await this.select2Options.first().click();
  }

  async selectMedicine() {
    await this.medicineName.click();
    await this.select2Options.first().click();
  }

  async selectBatch() {
    await this.batchNo.click();
    await this.select2Options.first().click();
  }

  async enterQuantity() {
    const qty = parseInt(await this.availableQty.textContent());

    let value = 2;

    if (qty <= 2) value = 1;

    await this.quantity.fill(value.toString());
  }

  async enterDiscount() {
    await this.discount.fill("5");
  }

  async saveBill() {
    await this.saveBtn.click();

    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = PharmacyPage;
