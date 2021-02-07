import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList'
import {v1} from 'uuid';

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

function App() {

    let [todoList, setTodoList] = useState<Array<TodoListType>>([
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: v1(),
            title: 'What to buy',
            filter: 'all',
        }
    ])

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(value: string) {
        const task = {id: v1(), title: value, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className='App'>
            {
                todoList.map(tl => {
                    return <TodoList key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changStatus={changStatus}
                                     filter={filter}
                    />
                })
            }
        </div>
    );
}

export default App;