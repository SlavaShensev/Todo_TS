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

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'completed',}
    ])

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])

    // let [filter, setFilter] = useState<FilterValuesType>('all')

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todoLists])
        }
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
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
                todoLists.map((tl) => {
                    let tasksForTodoList = tasks
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasks.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasks.filter(t => t.isDone === true)
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
                    />
                })
            }
        </div>
    );
}

export default App;