import React, {ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type ListTypeProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (value: string) => void
    changStatus: (id: string, isDone: boolean) => void
    filter: string
}

function TodoList(props: ListTypeProps) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div className="List">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={(e) => {
                               setTitle(e.currentTarget.value)
                           }}
                           onKeyPress={e => {
                               setError(null)
                               if (e.charCode === 13) {
                                   addTask()
                               }
                           }}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addTask}>+</button>

                    {error && <div className={'error_message'}>{error}</div>}

                </div>
                <ul>
                    {
                        props.tasks.map(t => <li key={t.id}>
                            <input type={'checkbox'}
                                   checked={t.isDone}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                       const newIsDoneValue = e.currentTarget.checked
                                       props.changStatus(t.id, newIsDoneValue)
                                   }}
                            />
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </button>
                        </li>)
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active_filter' :''}
                            onClick={() => {
                                props.changeFilter('all')
                            }}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active_filter' :''}
                        onClick={() => {
                        props.changeFilter('active')
                    }}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active_filter' :''}
                        onClick={() => {
                        props.changeFilter('completed')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;