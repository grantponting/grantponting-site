import { type Locator, type Page } from '@playwright/test';

export class NavBar {
    readonly page: Page;
    readonly navBarLinks: Locator;
    readonly grantPontingLink: Locator;
    readonly homeLink: Locator;
    readonly loginLink: Locator;
    readonly automationTestLink: Locator;
    readonly projectsDropdown: Locator;
    readonly microservicesTestLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBarLinks = this.page.locator('nav a');
        this.grantPontingLink = this.navBarLinks.filter({ hasText: 'Grant Ponting' });
        this.homeLink = this.navBarLinks.filter({ hasText: 'Home' });
        this.loginLink = this.navBarLinks.filter({ hasText: 'Login' });
        this.automationTestLink = this.navBarLinks.filter({ hasText: 'Automation Test' });
        this.projectsDropdown = this.page.locator('nav a[id="basic-nav-dropdown"]');
        this.microservicesTestLink = this.navBarLinks.filter({ hasText: 'Microservices Test' });
    }

    async goToHomePage() {
        await this.page.goto(process.env.BASE_URL || '');
    }
}