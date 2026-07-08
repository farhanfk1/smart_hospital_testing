const { expect } = require("@playwright/test");

class AddStaffPage {
  constructor(page) {
    this.page = page;

    // ===========================
    // Human Resource Menu
    // ===========================
    this.hrMenu = page.locator(
      "//span[normalize-space()='Human Resource']/parent::a",
    );

    // ===========================
    // Add Staff Button
    // ===========================
    this.addStaffButton = page.locator(
      "a[href='https://demo.smart-hospital.in/admin/staff/create']",
    );

    // ===========================
    // Staff ID
    // ===========================
    this.staffId = page.locator("#employee_id");

    // ===========================
    // Role
    // ===========================
    this.role = page.locator("#role");

    // ===========================
    // Designation
    // ===========================
    this.designation = page.locator("#designation");

    // ===========================
    // Department
    // ===========================
    this.department = page.locator("#department");

    // ===========================
    // Specialist
    // ===========================
    this.specialist = page.locator(".ms-options-wrap button");

    this.specialistOption = page.locator("#ms-opt-1");

    // ===========================
    // First Name
    // ===========================
    this.firstName = page.locator("#name");

    // ===========================
    // Last Name
    // ===========================
    this.lastName = page.locator("#surname");

    // ===========================
    // Father Name
    // ===========================
    this.fatherName = page.locator("#father_name");

    // ===========================
    // Mother Name
    // ===========================
    this.motherName = page.locator("#mother_name");

    // ===========================
    // Gender
    // ===========================
    this.gender = page.locator("select[name='gender']");

    // ===========================
    // Date Of Birth
    // ===========================
    this.dob = page.locator("#dob");

    // ===========================
    // Email
    // ===========================
    this.email = page.locator("#email");

    // ===========================
    // Save Button
    // ===========================
    // Save Button
    this.saveButton = page.locator("button.btn-info.pull-right");

    // ===========================
    // URL Verification
    // ===========================
    this.staffPage = /staff/;
  }

  async openAddStaff() {
    await this.hrMenu.click();

    await expect(this.addStaffButton).toBeVisible();

    await this.addStaffButton.click();
  }

  async enterStaffId(id) {
    await this.staffId.fill(id);
  }

  async selectRole(index = 1) {
    await this.role.selectOption({ index });
  }

  async selectDesignation(index = 1) {
    await this.designation.selectOption({ index });
  }

  async selectDepartment(index = 1) {
    await this.department.selectOption({ index });
  }

  async selectSpecialist() {
    await this.specialist.click();

    await this.specialistOption.check();

    await this.page.locator("body").click();
  }

  async enterFirstName(name) {
    await this.firstName.fill(name);
  }

  async enterLastName(name) {
    await this.lastName.fill(name);
  }

  async enterFatherName(name) {
    await this.fatherName.fill(name);
  }

  async enterMotherName(name) {
    await this.motherName.fill(name);
  }

  async selectGender(index = 1) {
    await this.gender.selectOption({ index });
  }

  async selectDOB(date) {
    await this.dob.click();
    await this.dob.clear();
    await this.dob.type(date);
    // Current date will be selected automatically
    await this.page.locator("body").click();
  }

  async enterEmail(email) {
    await this.email.fill(email);
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async verifyHumanResourcePage() {
    await expect(this.page).toHaveURL(/staff/);
  }
}

module.exports = AddStaffPage;
