import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskAndValidate, postTaskAndValidate } from './support/helpers'
import { TasksPage } from './support/pages/tasks'

test('Must create a new task', async ({ page, request }) => {

    const task: TaskModel = {
        name: 'Read a book',
        is_done: false
    }

    await deleteTaskAndValidate(request, task.name, 204)

    const tasksPage: TasksPage = new TasksPage(page, task)

    await tasksPage.go()

    await tasksPage.create(task)

    await tasksPage.shouldHaveText(task.name)
})

test('Must forbid duplicated task', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'Buy ketchup',
        is_done: false
    }

    await deleteTaskAndValidate(request, task.name, 204)
    
    await postTaskAndValidate(request, task, 201)
    
    const tasksPage: TasksPage = new TasksPage(page, task)

    await tasksPage.go()

    await tasksPage.create(task)

    await tasksPage.alertHaveText('Task already exists!')
});

test.only('Must fill a required field', async ({ page }) => {
    const task: TaskModel = {
        name: '',
        is_done: false
    }
    
    const tasksPage: TasksPage = new TasksPage(page, task)
    
    await tasksPage.go()

    await tasksPage.create(task)

    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
});