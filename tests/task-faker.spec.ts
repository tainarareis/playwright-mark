import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


test('Must create a new task using Faker', async ({ page }) => {
    
    const taskName = faker.lorem.words()

    await page.goto('/')

    const inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    await inputTaskName.fill(taskName)

    await page.click('xpath=//button[contains(text(), "Create")]')

    const target = page.locator(`css=.task-item p >> text=${taskName}`)
    await expect(target).toBeVisible()

    await page.waitForTimeout(3000)
})

