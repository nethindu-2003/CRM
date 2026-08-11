import { test, expect } from '@playwright/test';

test.describe('Leads Management Workflow', () => {
  const timestamp = Date.now();
  const testEmail = `leads_test_${timestamp}@example.com`;
  const testPassword = 'password123';
  const leadName = `Test Lead ${timestamp}`;

  test.beforeEach(async ({ page }) => {
    // Register and login
    await page.goto('/register');
    await page.getByLabel('Email Address').fill(testEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Dashboard overview' })).toBeVisible({ timeout: 10000 });
  });

  test('should create, view, edit, and delete a lead', async ({ page }) => {
    // Navigate to Leads
    await page.getByRole('link', { name: 'Leads' }).click();
    await expect(page).toHaveURL('/leads');

    // Add New Lead
    await page.getByRole('button', { name: 'Add New Lead' }).click();
    await expect(page.getByRole('heading', { name: 'Add New Lead' })).toBeVisible();

    // Fill form
    // Note: The modal might have labels that are the same as the filter inputs, so we use precise selectors
    const modal = page.locator('.glass-panel', { hasText: 'Add New Lead' });
    await modal.locator('label:has-text("Name *") + input').fill(leadName);
    await modal.locator('label:has-text("Company") + input').fill('Test Company LLC');
    await modal.locator('label:has-text("Email") + input').fill(`contact_${timestamp}@example.com`);
    await modal.locator('label:has-text("Phone") + input').fill('1234567890');
    await modal.locator('label:has-text("Deal Value") + input').fill('5000');
    
    await modal.getByRole('button', { name: 'Save Lead' }).click();

    // Verify lead appears in the table
    // We expect the lead name to be visible in the table
    await expect(page.getByText(leadName)).toBeVisible();

    // Setup window.confirm handler for deletion later
    page.on('dialog', dialog => dialog.accept());

    // View/Edit lead
    // Click on the eye icon for the newly created lead
    // We can find the row with the lead name, and click the link with title="View/Edit Details"
    const row = page.locator('tr', { hasText: leadName });
    await row.getByTitle('View/Edit Details').click();

    // Verify Lead Details page
    await expect(page.getByRole('heading', { name: leadName })).toBeVisible();
    await expect(page.getByText('Test Company LLC').first()).toBeVisible();

    // Edit lead
    await page.getByRole('button', { name: 'Edit' }).click();
    // Assuming the company input is the 3rd input in the form or we can just use the value
    // Since there are multiple inputs without explicit IDs, we can target them by current value
    await page.locator('input[value="Test Company LLC"]').fill('Updated Company INC');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // Verify changes
    await expect(page.getByText('Updated Company INC').first()).toBeVisible();

    // Add a note
    await page.getByPlaceholder('Add a new note...').fill('This is a test note');
    await page.getByRole('button', { name: 'Add Note' }).click();
    await expect(page.getByText('This is a test note')).toBeVisible();

    // Go back to leads list
    await page.getByRole('link', { name: 'Back to Leads' }).click();
    await expect(page).toHaveURL('/leads');

    // Delete lead
    const updatedRow = page.locator('tr', { hasText: leadName });
    await updatedRow.getByTitle('Delete Lead').click();

    // Verify lead is removed
    await expect(page.getByText(leadName)).not.toBeVisible();
  });
});
