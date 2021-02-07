import React, {ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

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
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div className="List">
            <div>
                <h3>{props.title}
                    <button onClick={()=> {
                        props.removeTodoList(props.id)
                    }}> x </button>
                </h3>
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
                        props.tasks.map(t => <li key={t.id} className={t.isDone ? 'is_done' : ''}>
                            <input type={'checkbox'}
                                   checked={t.isDone}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                       const newIsDoneValue = e.currentTarget.checked
                                       props.changStatus(t.id, newIsDoneValue, props.id)
                                   }}
                            />
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id, props.id)
                            }}>x
                            </button>
                        </li>)
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active_filter' : ''}
                            onClick={() => {
                                props.changeFilter('all', props.id)
                            }}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active_filter' : ''}
                            onClick={() => {
                                props.changeFilter('active', props.id)
                            }}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active_filter' : ''}
                            onClick={() => {
                                props.changeFilter('completed', props.id)
                            }}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;