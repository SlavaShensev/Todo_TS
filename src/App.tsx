import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type filterValuesType = 'all' | 'active' | 'completed'

function App() {
    const array = useState<Array<TaskType>>([
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'Redux', isDone: true}
    ])

    // const tasks = array[0]
    // const setTasks = array[1]

    const [tasks, setTasks] = array

    const [filter, setFilter] = useState<filterValuesType>('all')

    function removeTask(taskID: number) {
        let newState = (tasks.filter(t => t.id !== taskID))
        setTasks(newState)
    }

    function changeFilter(newFilterValue: filterValuesType) {
        setFilter(newFilterValue)
    }

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className='App'>
            <TodoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;