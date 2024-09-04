import { APIRequestContext, expect } from "@playwright/test";
import { TaskModel } from "../fixtures/task.model";

const API_URL: string = process.env.API_URL || ''

export async function deleteTaskAndValidate ( request: APIRequestContext, taskName: string, expectedstatusCode = 204) {
    const deletedTask = await request.delete(API_URL + taskName)
    expect(deletedTask.status()).toBe(expectedstatusCode)
}

export async function postTaskAndValidate ( request: APIRequestContext, task: TaskModel, expectedStatusCode = 201) {
    const newTask = await request.post(API_URL, { data: task })
    expect(newTask.status()).toBe(expectedStatusCode)
}