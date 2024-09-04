import { expect, Locator, Page } from "@playwright/test";
import { TaskModel } from "../../../fixtures/task.model";


export class TasksPage {

    readonly page: Page
    readonly inputTaskName: Locator

    constructor(page: Page){
        this.page =  page
        this.inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    }

    async go() {
        await this.page.goto('/')
    }
    async create(task: TaskModel) {
        await this.inputTaskName.fill(task.name)
        await this.page.click('css=button >> text=Create')
    }

    async toggle(taskName: string) {
        const target = this.page.locator(`//p[text()="${taskName}"]/parent::*/button[contains(@class, "Toggle")]`)
        await target.click()
    }

    async shouldHaveText(taskName: string){
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async shouldFillRequiredField() {
        await this.page.click('css=button >> text=Create')

    }

    async shouldBeDone(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }
}