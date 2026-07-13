class AppointmentPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.appointmentMenu = page.locator('a[href*="admin/appointment/index"]');

    this.addAppointmentButton = page.locator("a.addappointment").first();

    // Modal
    this.appointmentModal = page.locator("#myModal");

    this.appointmentForm = this.appointmentModal.locator("#formadd");

    // Patient (Select2)
    this.patientDropdown = this.page.locator(
      'span.select2-selection--single[aria-labelledby="select2-addpatient_id-container"]',
    );
    this.patientSearch = page.locator(
      ".select2-container--open input.select2-search__field",
    );
    this.patientOption = page.locator(".select2-results__option");

    // Doctor
    this.doctor = this.appointmentForm.locator("#doctorid");

    // Shift
    this.shift = this.appointmentForm.locator("#global_shift");

    // Appointment Date
    this.appointmentDate = this.appointmentForm.locator("#datetimepicker");

    // Slot
    this.slot = this.appointmentForm.locator("#slot");

    // Status
    this.status = this.appointmentForm.locator("#appointment_status");

    // Save Button
    this.saveButton = this.appointmentForm.locator("#formaddbtn");
  }

  async openAddAppointment() {
    await this.appointmentMenu.click();

    await this.addAppointmentButton.waitFor({
      state: "visible",
    });

    await this.addAppointmentButton.click();
     // Wait until the Add Patient form is completely open
  
   
  }

  async addAppointment(data) {
    // Patient (Select2)
    // Patient (Select2)
await this.patientDropdown.click();
await this.patientSearch.fill(data.patient);

// Wait for the first result to appear
const firstPatient = this.patientOption.first();
await firstPatient.waitFor({ state: "visible" });

// Select the first result
await firstPatient.click();

    // Doctor
    await this.doctor.selectOption({
      label: data.doctor,
    });

    // Wait for shifts to load
    await this.page.waitForTimeout(10000);

    // Shift
    await this.shift.selectOption({
      label: data.shift,
    });

    // Wait for slots to load
    await this.page.waitForTimeout(10000);

    // Appointment Date
    await this.appointmentDate.click();
    await this.appointmentDate.press("Control+A");
    await this.appointmentDate.fill(data.appointmentDate);
    await this.appointmentDate.press("Tab");

    // Wait for slot list to refresh
    await this.page.waitForTimeout(10000);

    // Slot
    await this.slot.click();
    await this.slot.selectOption({
      index: 1
    });
   

    // Status
    await this.status.selectOption({
      label: data.status,
    });

    // Save
    await this.saveButton.click();
  }
}

module.exports = AppointmentPage;
