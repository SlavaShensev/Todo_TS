import React, {useState} from "react";
import Todolist from "./component/ToDo";
import './App.css';
import {v1} from "uuid";

export type ValueFilterType = 'all' | 'active' | 'completed'
export type TodoList = {
    id: string
    title: string
    filter: ValueFilterType
}
const App = () => {
    const [todoList, setTodoList] = useState<Array<TodoList>>([
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: v1(),
            title: 'What to by',
            filter: "all"
        }
    ])
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])
    const [filter, setFilter] = useState<ValueFilterType>('all')
    const changeFilter = (value: ValueFilterType) => {
        setFilter(value)
    }
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }
    const addTask = (title: string) => {
        const task = {id: v1(), title: title, isDone: false}
        const newTasks = [task, ...tasks]
        setTasks(newTasks)
    }
    const changeStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === id)
        console.log('clicked')
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }
    return <div className='App'>
        {
            todoList.map(tl => {
                let tasksForTodoList = tasks
                if (filter === 'active') {
                    tasksForTodoList = tasks.filter(t => t.isDone === false)
                }
                if (filter === 'completed') {
                    tasksForTodoList = tasks.filter(t => t.isDone === true)
                }
                return <Todolist key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={tasksForTodoList}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 filter={tl.filter}
                />
            })
        }
    </div>

}

export default App