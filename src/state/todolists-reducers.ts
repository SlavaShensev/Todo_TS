import {TodoListType, ValueFilterType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: ValueFilterType
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        case  'CHANGE-TODOLIST-FILTER':
            const todoListActual = state.find(tl => tl.id === action.id)
            if (todoListActual) {
                todoListActual.filter = action.filter
            }
            return [...state]
        default:
            throw new Error('\'I don\'t understand this type')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}

export const addTodolistAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()} as const
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title} as const
}

export const changeTodolistFilterAC = (filter: ValueFilterType, id: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter} as const
}