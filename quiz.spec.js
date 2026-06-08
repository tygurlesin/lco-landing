// @ts-check
const { test, expect } = require('@playwright/test');

// The live landing page under test.
const URL = 'https://tygurlesin.github.io/lco-landing/';

test.describe('Legendary Club Owner — landing page quiz', () => {

  test('all three questions load and a result is shown', async ({ page }) => {
    await page.goto(URL);

    // Q1 is visible on load
    await expect(page.locator('.q-step.show')).toContainText('Question 1 of 3');
    await page.locator('.q-step.show .opt').first().click();

    // Q2 appears after answering Q1
    await expect(page.locator('.q-step.show')).toContainText('Question 2 of 3');
    await page.locator('.q-step.show .opt').first().click();

    // Q3 appears after answering Q2
    await expect(page.locator('.q-step.show')).toContainText('Question 3 of 3');
    await page.locator('.q-step.show .opt').first().click();

    // The result card is revealed with an archetype name and the call-to-action button
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-arch')).not.toBeEmpty();
    await expect(page.locator('#r-cta')).toBeVisible();
  });

  test('answering with the first option every time gives The Tactician (3-0-0)', async ({ page }) => {
    await page.goto(URL);
    // Option A in every question maps to the Tactician (data-arch="T")
    await page.locator('.q-step.show .opt[data-arch="T"]').click();
    await page.locator('.q-step.show .opt[data-arch="T"]').click();
    await page.locator('.q-step.show .opt[data-arch="T"]').click();

    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-arch')).toHaveText('THE TACTICIAN');
  });

  test('picking one of each archetype unlocks The Mentality Monster (1-1-1)', async ({ page }) => {
    await page.goto(URL);
    // One Tactician, one Scout, one Architect answer -> the hidden result
    await page.locator('.q-step.show .opt[data-arch="T"]').click();
    await page.locator('.q-step.show .opt[data-arch="S"]').click();
    await page.locator('.q-step.show .opt[data-arch="A"]').click();

    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#r-arch')).toHaveText('THE MENTALITY MONSTER');
  });

  test('the progress bar advances as questions are answered', async ({ page }) => {
    await page.goto(URL);
    const bars = page.locator('#progress span');
    await expect(bars).toHaveCount(3);

    await page.locator('.q-step.show .opt').first().click();
    await expect(bars.nth(0)).toHaveClass(/done/);   // first step marked complete

    await page.locator('.q-step.show .opt').first().click();
    await expect(bars.nth(1)).toHaveClass(/done/);   // second step marked complete
  });

  test('"Take it again" resets the quiz back to Question 1', async ({ page }) => {
    await page.goto(URL);
    await page.locator('.q-step.show .opt').first().click();
    await page.locator('.q-step.show .opt').first().click();
    await page.locator('.q-step.show .opt').first().click();
    await expect(page.locator('#result')).toBeVisible();

    await page.getByRole('button', { name: 'Take it again' }).click();
    await expect(page.locator('.q-step.show')).toContainText('Question 1 of 3');
  });

});
