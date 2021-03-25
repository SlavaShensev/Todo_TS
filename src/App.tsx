import React, {useState} from "react";
import Todolist from "./component/ToDo";
import './App.css';

export type ValueFilterType = 'all' | 'active' | 'completed'

const App = () => {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    const [filter, setFilter] = useState<ValueFilterType>('all')

    const changeFilter = (value: ValueFilterType) => {
        setFilter(value)
    }

    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }

    return <div className='App'>
        <Todolist title={'What to learn'}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
        />
    </div>

}

export default App