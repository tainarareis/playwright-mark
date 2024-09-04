import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskAndValidate, postTaskAndValidate } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import testData from "./fixtures/tasks.json";

test('Must create a new task', async ({ page, request }) => {

    const task = testData.success as TaskModel

    await deleteTaskAndValidate(request, task.name, 204)

    const tasksPage: TasksPage = new TasksPage(page, task)

    await tasksPage.go()

    await tasksPage.create(task)

    await tasksPage.shouldHaveText(task.name)
})

test('Must forbid duplicated task', async ({ page, request }) => {
    const task = testData.duplicated as TaskModel

    await deleteTaskAndValidate(request, task.name, 204)
    
    await postTaskAndValidate(request, task, 201)
    
    const tasksPage: TasksPage = new TasksPage(page, task)

    await tasksPage.go()

    await tasksPage.create(task)

    await tasksPage.alertHaveText('Task already exists!')
});

test('Must fill a required field', async ({ page }) => {
    const task = testData.required as TaskModel
    
    const tasksPage: TasksPage = new TasksPage(page, task)
    
    await tasksPage.go()

    await tasksPage.create(task)

    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
});

test.only('Must finish a task', async ({ page, request }) => {
    const task = testData.update as TaskModel

    await deleteTaskAndValidate(request, task.name)
    await postTaskAndValidate(request, task)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()

    await tasksPage.toggle(task.name)

    await tasksPage.shouldBeDone(task.name)
});