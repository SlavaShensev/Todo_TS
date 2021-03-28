import React, {ChangeEvent} from "react";
import {ValueFilterType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    const addTask = (title: string) => {
        props.addTask(title, props.id)
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
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTitle = () => {
        console.log('changed')
    }
    return <div>
        <div>
            <h3>
                <EditableSpan value={props.title} changeTitle={changeTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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
                            <EditableSpan value={t.title} changeTitle={changeTitle}/>
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