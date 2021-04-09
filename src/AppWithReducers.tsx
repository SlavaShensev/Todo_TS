import React, {useReducer, useState} from "react";
import Todolist, {TasksType} from "./component/ToDo";
import './App.css';
import {v1} from "uuid";
import AddItemForm from "./component/AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducers";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducers";

export type ValueFilterType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: ValueFilterType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

const AppWithReducers = () => {
    const todoList1 = v1()
    const todoList2 = v1()

    const [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoList1, title: 'What to learn', filter: 'all'},
        {id: todoList2, title: 'What to by', filter: "all"}
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoList1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],
        [todoList2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Hooks', isDone: true},
        ],
    })

    const removeTask = (id: string, todoListID: string) => {
        const action = removeTaskAC(id, todoListID)
        dispatchToTasksReducer(action)
    }
    const addTask = (title: string, todoListID: string) => {
        const action = addTaskAC(title, todoListID)
        dispatchToTasksReducer(action)
    }
    const changeStatus = (id: string, isDone: boolean, todoListID: string) => {
        const action = changeTaskStatusAC(todoListID, isDone, todoListID)
        dispatchToTasksReducer(action)
    }
    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {  ////------------------->  //todo
        const action = changeTaskTitleAC(id, newTitle, todoListId)
        dispatchToTasksReducer(action)
    }
    const changeFilter = (value: ValueFilterType, todoListID: string) => {
        const action = changeTodolistFilterAC(value, todoListID)
        dispatchToTodolistsReducer(action)
    }
    const removeTodoList = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }
    const addTodoListTitle = (id: string, title: string) => { ///---------> //todo
        const action = changeTodolistTitleAC(id, title)
        dispatchToTodolistsReducer(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    return <div className='App'>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit"
                            aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Container fixed>
            <Grid container style={{margin: '20px 20px 20px 0'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todoLists.map(tl => {

                        let allTodoListTasks = tasks[tl.id]
                        let tasksForTodoList = allTodoListTasks

                        if (tl.filter === 'active') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          tasks={tasksForTodoList}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeStatus={changeStatus}
                                          filter={tl.filter}
                                          removeTodoList={removeTodoList}
                                          changeTaskTitle={changeTaskTitle}
                                          addTodoListTitle={addTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    </div>

}

export default AppWithReducers