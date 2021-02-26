import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemovedTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ActionType = RemovedTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    AddTodolistActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoListID = v1()
            const newTodoList = {
                id: newTodoListID,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const todoList2 = state.find(tl => tl.id === action.id)
            if (todoList2) {
                todoList2.filter = action.filter
            }
            return [...state]
        default:
            throw new Error('\'I don\'t understand this type')
    }
}

export const removeTodolistAC = (todolistID: string): RemovedTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID}
}

export const addTodoListAC = (title: string): AddTodolistActionType => {
    return {type:'ADD-TODOLIST', title: title}
}

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const changeTodoListFilterAC = (id: string, filter: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
