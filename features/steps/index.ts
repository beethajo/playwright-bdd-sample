import { expect } from "@playwright/test";
import logger, { Given, When, Then } from "./fixtures";


Given("I am on Playwright home page", async ({ page }) => {
 
  await page.goto('/');
  logger.info('after playwright home')
});

When("I click link {string}", async ({ page, }, name: string,) => {
  await page.getByRole("link", { name }).click();
});

Then("I see in title {string}", async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text));
});

Given('I open url {string}', async ({ page },url: string) => {
  await page.goto('/');
})
