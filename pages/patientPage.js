class PatientPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.patientMenu = page.locator('a[href*="admin/admin/search"]');

    this.addPatientButton = page.locator(
      "a[onclick*=\"holdModal('myModalpa')\"]",
    );

    // Modal
    this.patientModal = page.locator(".modal:visible");

    // Form
    this.patientForm = this.patientModal.locator("#formaddpa");

    // Fields
    this.name = this.patientForm.locator("#name");

    this.guardianName = this.patientForm.locator('input[name="guardian_name"]');

    this.gender = this.patientForm.locator("#addformgender");

    this.dateOfBirth = this.patientForm.locator("#birth_date");

    this.phone = this.patientForm.locator("#number");

    this.email = this.patientForm.locator("#addformemail");

    this.bloodGroup = this.patientForm.locator('select[name="blood_group"]');

    this.maritalStatus = this.patientForm.locator(
      'select[name="marital_status"]',
    );

    this.patientPhoto = this.patientForm.locator("#file");

    this.address = this.patientForm.locator('input[name="address"]');

    this.remarks = this.patientForm.locator("#note");

    this.anyKnownAllergies = this.patientForm.locator(
      'textarea[name="known_allergies"]',
    );

    this.tpa = this.patientForm.locator('select[name="organisation_id"]');

    this.tpaId = this.patientForm.locator('input[name="insurance_id"]');

    this.tpaValidity = this.patientForm.locator('input[name="validity"]');

    this.nationalIdentificationNumber = this.patientForm.locator(
      'input[name="identification_number"]',
    );

    this.alternateNumber = this.patientForm.locator(
      'input[name="custom_fields[patient][3]"]',
    );

    this.saveButton = this.patientForm.locator("#formaddpabtn");
  }

  async openAddPatient() {
    await this.patientMenu.click();

    await this.addPatientButton.waitFor({
      state: "visible",
    });

    await this.addPatientButton.click();
    // await this.page.waitForTimeout(1000);

    // Wait until the Add Patient form is visible
  await this.page.locator("#formaddpa").waitFor({
    state: "visible",
  });
  }

  async addPatient(data) {
    await this.name.fill(data.name);

    await this.guardianName.fill(data.guardianName);

    // Debug gender options if needed
    console.log(await this.gender.locator("option").allTextContents());

    await this.gender.selectOption({
      label: data.gender,
    });

    await this.dateOfBirth.click();
    await this.dateOfBirth.press("Control+A");
    await this.dateOfBirth.type(data.dateOfBirth, {
      delay: 100,
    });
    
    await this.phone.fill(data.phone);

    await this.email.fill(data.email);

    await this.bloodGroup.selectOption({
      label: data.bloodGroup,
    });

    await this.maritalStatus.selectOption({
      label: data.maritalStatus,
    });

    await this.patientPhoto.setInputFiles(data.patientPhoto);

    await this.address.fill(data.address);

    await this.remarks.fill(data.remarks);

    await this.anyKnownAllergies.fill(data.anyKnownAllergies);

    await this.tpa.selectOption({
      label: data.tpa,
    });

    await this.tpaId.fill(data.tpaId);

    await this.tpaValidity.click();
    await this.tpaValidity.press("Control+A");
    await this.tpaValidity.type(data.tpaValidity, { delay: 100 });
    await this.tpaValidity.press("Tab");

    await this.nationalIdentificationNumber.fill(
      data.nationalIdentificationNumber,
    );

    await this.alternateNumber.fill(data.alternateNumber);

    await this.saveButton.click();
  }
}

module.exports = PatientPage;
