import React, {useState, ChangeEvent} from "react";
import {ValueFilterType} from "../App";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsTYpe = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: ValueFilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: string
}

const Todolist = (props: TodoListPropsTYpe) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    return <div>
        <div>
            <h3> {props.title} </h3>
        </div>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>
                +
            </button>
            {error && <div className={'error-message'}>
                {error}
            </div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue)
                    }
                    return (
                        <li key={t.id}
                            className={t.isDone ? 'is-done' : ''}
                        >
                            <input type='checkbox'
                                   checked={t.isDone}
                                   onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>
                                x
                            </button>
                        </li>
                    )
                })
            }
        </ul>
        <button className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={onAllClickHandler}>All
        </button>
        <button className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''}
                onClick={onCompletedClickHandler}>Completed
        </button>
    </div>
}

export default Todolist