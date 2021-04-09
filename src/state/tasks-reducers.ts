import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType
} from "./todolists-reducers";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListID: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todoListId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todoListId: string
    title: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            const stateCopy = {...state}
            const tasks = state[action.todoListID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListID] = filteredTasks
            return stateCopy
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todoListId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('\'I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todoListID: todoListID}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListId}
}

export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todoListId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, todoListId, isDone}
}

export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todoListId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todoListId}
}

