import React, {useState} from "react";
import Todolist from "./component/ToDo";
import './App.css';
import {v1} from "uuid";

export type ValueFilterType = 'all' | 'active' | 'completed'

const App = () => {
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
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }


    return <div className='App'>
        <Todolist title={'What to learn'}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
        />
    </div>

}

export default App