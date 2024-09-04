import { test, expect } from '@playwright/test'

test('Webapp must be online', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle("Gerencie suas tarefas com Mark L")

    await page.waitForTimeout(3000)
})