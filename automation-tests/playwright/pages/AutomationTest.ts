import { type Locator, type Page } from '@playwright/test';

export class AutomationTest {
    readonly page: Page;
    readonly countText: Locator;
    readonly incrementButton: Locator;
    readonly decrementButton: Locator;
    readonly searchInput: Locator;
    readonly searchItems: Locator;
    readonly searchItemByText: any;
    readonly nameText: Locator;
    readonly nameInput: Locator;
    readonly nameSubmitButton: Locator;
    readonly responseText: Locator;
    readonly todoItemText: Locator;
    readonly openModalButton: Locator;
    readonly testModalText: Locator;
    readonly closeModalButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Count
        this.countText = page.locator('text[data-test-id="count_text"]');
        this.incrementButton = page.locator('button[data-test-id="increment_btn"]');
        this.decrementButton = page.locator('button[data-test-id="decrement_btn"]');

        // Search
        this.searchInput = page.locator('input[data-test-id="search_input"]');
        this.searchItems = page.locator('li[data-test-id="search_item"]');
        this.searchItemByText = (text: string) => this.searchItems.filter({ hasText: text });

        // Name Submit
        this.nameText = page.locator('div').filter({ hasText: 'Name:' });
        this.nameInput = page.locator('input[data-test-id="form_input"]');
        this.nameSubmitButton = page.locator('button[data-test-id="submit_btn"]');
        this.responseText = this.nameText.locator('div');

        // API Search
        this.todoItemText = page.getByText('Todo Item');

        // Modal
        this.openModalButton = page.locator('button[data-test-id="open_btn"]');
        this.testModalText = page.getByText('Test Modal');
        this.closeModalButton = page.locator('button[data-test-id="modal_btn"]');
    }

    async goTo() {
        await this.page.goto(process.env.BASE_URL + '/automation-test');
    }
}