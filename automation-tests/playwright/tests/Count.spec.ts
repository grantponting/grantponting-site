import { test, expect } from '@playwright/test';
import { AutomationTest } from '../pages/AutomationTest';

test.beforeEach(async ({ page }) => {
    let automationTest = new AutomationTest(page);

    await automationTest.goTo();
});

test('Count Feature is Visible', async ({ page }) => {
    let automationTest = new AutomationTest(page);

    await expect(automationTest.countText).toBeVisible();
    await expect(automationTest.incrementButton).toBeVisible();
    await expect(automationTest.decrementButton).toBeVisible();
});

test('Increment Button works properly', async ({ page }) => {
    let automationTest = new AutomationTest(page);

    await expect(automationTest.countText).toContainText('0');
    await automationTest.incrementButton.click();
    await expect(automationTest.countText).toContainText('1');
});

test('Decrement Button works properly', async ({ page }) => {
    let automationTest = new AutomationTest(page);

    await expect(automationTest.countText).toContainText('0');
    await automationTest.decrementButton.click();
    await expect(automationTest.countText).toContainText('-1');
});

test('Increment and Decrement Test', async ({ page }) => {
    let automationTest = new AutomationTest(page);

    await expect(automationTest.countText).toContainText('0');
    await automationTest.incrementButton.click();
    await expect(automationTest.countText).toContainText('1');
    await automationTest.incrementButton.click();
    await expect(automationTest.countText).toContainText('2');
    await automationTest.decrementButton.click();
    await expect(automationTest.countText).toContainText('1');
});
