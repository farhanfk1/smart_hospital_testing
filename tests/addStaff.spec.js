const { test } = require("@playwright/test");

const LoginPage = require("../pages/loginPage");
const AddStaffPage = require("../pages/addStaffPage");

const loginData = require("../test-data/loginData");
const staff = require("../test-data/addStaffData");

const users = loginData.filter((user) =>
  ["Super Admin", "Admin", "Accountant"].includes(user.role),
);

users.forEach((user) => {
  test(`Add Staff as ${user.role}`, async ({ page }) => {
    const login = new LoginPage(page);
    const addStaff = new AddStaffPage(page);

    // Login
    await login.open();
    await login.selectRole(user.role);
    await login.login();

    // Open Add Staff
    await addStaff.openAddStaff();

    // Staff Details
    await addStaff.enterStaffId(staff.staffId);

    await addStaff.selectRole(staff.roleIndex);

    await addStaff.selectDesignation(staff.designationIndex);

    await addStaff.selectDepartment(staff.departmentIndex);

    await addStaff.selectSpecialist();

    await addStaff.enterFirstName(staff.firstName);

    await addStaff.enterLastName(staff.lastName);

    await addStaff.enterFatherName(staff.fatherName);

    await addStaff.enterMotherName(staff.motherName);

    await addStaff.selectGender(staff.genderIndex);

    await addStaff.selectDOB(staff.date);

    await addStaff.enterEmail(staff.email);

    // Save
    await addStaff.clickSave();

    // Verification
    await addStaff.verifyHumanResourcePage();
  });
});
