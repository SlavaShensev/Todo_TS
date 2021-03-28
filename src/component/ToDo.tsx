import React, {useState, ChangeEvent} from "react";
import {ValueFilterType} from "../App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    id: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: ValueFilterType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter: string
    removeTodoList: (id: string) => void
}

const Todolist = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
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
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    return <div>
        <div>
            {props.title}
            <button onClick={() => {
                props.removeTodoList(props.id)
            }}>x
            </button>
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
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
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