import React, {useState} from "react";
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


export type ValueFilterType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: ValueFilterType
}

type TasksStateType = {
    [key: string]: Array<TasksType>
}

const App = () => {
    const todoList1 = v1()
    const todoList2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoList1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todoList2,
            title: 'What to by',
            filter: "all"
        }
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],
        [todoList2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Hooks', isDone: true},
        ],
    })

    const changeFilter = (value: ValueFilterType, todoListID: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    const removeTask = (id: string, todoListID: string) => {
        //достанем нужный массив по todoListID
        const todoListTasks = tasks[todoListID]
        //перезапишем в этом обьекте массыв для нужного тудудиста отфильтрованым масивом
        tasks[todoListID] = todoListTasks.filter(t => t.id != id)
        //засетаем в стейт копию обьекта, что бы React отреагировал перерисовкой
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListID: string) => {
        const task = {
            id: v1(),
            title: title,
            isDone: false,
        }
        // достаем нужный массив по todoListID
        const todoListTasks = tasks[todoListID]
        //перезапишем в этом обьекте массив для нужного тудулиста копией, добавив в нвчало нов т
        tasks[todoListID] = [task, ...todoListTasks]
        //засетаем в стейт копию обьекта, что бы React отреагировал перерисовкой
        setTasks({...tasks})
    }
    const changeStatus = (id: string, isDone: boolean, todoListID: string) => {
        //достанем нужный массив по  todoListID
        const todoListTasks = tasks[todoListID]
        //найдем нужную таску
        const task = todoListTasks.find(t => t.id === id)
        //изменим таску если она нашлась
        if (task) {
            task.isDone = isDone
        }
        //засетаем в стейт копию обьекта, что бы React отреагировал перерисовкой
        setTasks({...tasks})
    }
    const removeTodoList = (id: string) => {
        //засунем в ситейт список тудулистов, id - не равны, который нужно выкинуть
        setTodoLists(todoLists.filter(tl => tl.id != id))
        //удалим таски для этого тудулиста, где отдельно таски
        delete tasks[id]
        setTasks({...tasks})
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            [newTodoListID]: [],
            ...tasks,
        })
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
                            <Paper style={{padding: '10px'}} >
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
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    </div>

}

export default App