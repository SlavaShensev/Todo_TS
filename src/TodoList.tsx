import React, {ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type ListTypeProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (value: string) => void
    changStatus: (id: string, isDone: boolean) => void
}

function TodoList(props: ListTypeProps) {
    let [title, setTitle] = useState('')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        }
    }

    return (
        <div className="List">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={(e)=> {
                               setTitle(e.currentTarget.value)
                           }}
                           onKeyPress={e => {
                               if(e.charCode === 13) {
                                   addTask()
                               }
                           }}
                    />
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map(t => <li key={t.id}>
                            <input type={'checkbox'}
                                   checked={t.isDone}
                                   onChange={(e: ChangeEvent<HTMLInputElement>)=> {
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
                    <button onClick={() => {
                        props.changeFilter('all')
                    }}>All
                    </button>
                    <button onClick={() => {
                        props.changeFilter('active')
                    }}>Active
                    </button>
                    <button onClick={() => {
                        props.changeFilter('completed')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;