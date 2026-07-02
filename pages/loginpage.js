class LoginPage {
  constructor(page) {
    this.page = page;

    this.signInButton = 'button[type="submit"]';
  }

  async open() {
    await this.page.goto("https://demo.smart-hospital.in/site/login");
  }

  async selectRole(role) {
    await this.page.getByText(role, { exact: true }).click();
  }

  async login() {
    await this.page.click(this.signInButton);
  }
}

module.exports = LoginPage;
