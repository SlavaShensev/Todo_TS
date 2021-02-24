import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList'
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoList1 = v1()
    const todoList2 = v1()

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'What to learn', filter: 'active'},
        {id: todoList2, title: 'What to buy', filter: 'completed',}
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todoList1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todoLists])
        }
    }

    function removeTodoList(todoListId: string) {
        let filteredTodoList = todoLists.filter(tl=> tl.id !== todoListId)
        setTodoList(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }
    
    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(value: string, todoListId: string) {
        const task = {id: v1(), title: value, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

    function changStatus(id: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTitleTask(id: string, title: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.title = title
            setTasks({...tasksObj})
        }
    }

    function addTodoList(title: string) {
        let newTodoListId = v1()
        let newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter:'all',
        }
        setTodoList([newTodoList, ...todoLists])
        setTasks({
            ...tasksObj,
            [newTodoListId]: []
        })
    }
    
    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }
                    return <TodoList key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changStatus={changStatus}
                                     filter={tl.filter}
                                     removeTodoList={removeTodoList}
                                     changeTitleTask={changeTitleTask}
                    />
                })
            }
        </div>
    );
}

export default App;