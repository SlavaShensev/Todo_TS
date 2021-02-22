import React, {ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "../App";

type ListTypeProps = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (value: string, todoListId: string) => void
    changStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

function TodoList(props: ListTypeProps) {

    

    const onClickHandler = () => props.removeTodoList(props.id)
    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickActiveHandler = () => props.changeFilter('active', props.id)
    const onClickCompletedHandler = () => props.changeFilter('completed', props.id)
    return (
        <div className="List">
            <div>
                <h3>{props.title}
                    <button onClick={onClickHandler}>
                        x
                    </button>
                </h3>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            return <li key={t.id} className={t.isDone ? 'is_done' : ''}>
                                <input type={'checkbox'}
                                       checked={t.isDone}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                           const newIsDoneValue = e.currentTarget.checked
                                           props.changStatus(t.id, newIsDoneValue, props.id)
                                       }}
                                />
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>x
                                </button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active_filter' : ''}
                            onClick={onClickAllHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active_filter' : ''}
                            onClick={onClickActiveHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active_filter' : ''}
                            onClick={onClickCompletedHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}


export default TodoList;