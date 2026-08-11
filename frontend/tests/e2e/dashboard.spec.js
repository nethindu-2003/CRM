import { test, expect } from '@playwright/test';

test.describe('Dashboard and Navigation Workflow', () => {
  const timestamp = Date.now();
  const testEmail = `dashboard_test_${timestamp}@example.com`;
  const testPassword = 'password123';

  test.beforeEach(async ({ page }) => {
    // Register and login for each test to ensure clean state
    await page.goto('/register');
    await page.getByLabel('Email Address').fill(testEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Dashboard overview' })).toBeVisible({ timeout: 10000 });
  });

  test('should display dashboard metrics', async ({ page }) => {
    // Verify Dashboard Cards are visible
    await expect(page.getByText('Total Leads')).toBeVisible();
    await expect(page.getByText('New Leads')).toBeVisible();
    await expect(page.getByText('Qualified Leads')).toBeVisible();
    await expect(page.getByText('Deals Won')).toBeVisible();
    await expect(page.getByText('Deals Lost')).toBeVisible();
    await expect(page.getByText('Total Pipeline Value')).toBeVisible();
    await expect(page.getByText('Won Deal Value')).toBeVisible();
  });

  test('should navigate using sidebar', async ({ page }) => {
    // Navigate to Leads
    await page.getByRole('link', { name: 'Leads' }).click();
    await expect(page).toHaveURL('/leads');
    // We expect a header or some text for Leads page, check for 'Leads Management' or similar later.
    // For now, just URL check is fine.

    // Navigate to Pipeline Board
    await page.getByRole('link', { name: 'Pipeline Board' }).click();
    await expect(page).toHaveURL('/board');

    // Navigate back to Dashboard
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL('/');
  });
});
