import { test, expect } from '@playwright/test';

test.describe('Authentication Workflow', () => {
  const timestamp = Date.now();
  const testEmail = `testuser_${timestamp}@example.com`;
  const testPassword = 'password123';

  test('should register a new user successfully', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: 'Nexus CRM' })).toBeVisible();

    // Fill in the registration form
    await page.getByLabel('Email Address').fill(testEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByRole('button', { name: 'Register' }).click();

    // Verify successful registration by checking redirection to dashboard
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Dashboard overview' })).toBeVisible({ timeout: 10000 });
  });

  test('should login an existing user successfully', async ({ page }) => {
    // First register the user to ensure they exist (since we run tests independently)
    // In a real scenario, you'd use a seeded user or global setup
    const loginEmail = `login_${timestamp}@example.com`;
    
    // Register step
    await page.goto('/register');
    await page.getByLabel('Email Address').fill(loginEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL('/');

    // Logout step
    // Assuming there is a logout button in the sidebar
    await page.getByText('Logout').click();
    await expect(page).toHaveURL('/login');

    // Login step
    await page.getByLabel('Email Address').fill(loginEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify successful login
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Dashboard overview' })).toBeVisible({ timeout: 10000 });
  });
});
