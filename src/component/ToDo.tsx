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
}

const Todolist = (props: TodoListPropsTYpe) => {
    const [title, setTitle] = useState('')
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent) => {
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
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }
                    return (
                        <li key={t.id}>
                            <input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>
                                x
                            </button>
                        </li>
                    )
                })
            }
        </ul>
        <button onClick={onAllClickHandler}>All
        </button>
        <button onClick={onActiveClickHandler}>Active
        </button>
        <button onClick={onCompletedClickHandler}>Completed
        </button>
    </div>
}

export default Todolist