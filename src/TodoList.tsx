import React, {useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type ListTypeProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: () => void
}

function TodoList(props: ListTypeProps) {
let [title, setTitle] = useState('')
    return (
        <div className="List">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}/>
                    <button onClick={props.addTask}>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map(t => <li key={t.id}>
                            <input type={'checkbox'} checked={t.isDone}/>
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
                    }}>All</button>
                    <button onClick={() => {
                        props.changeFilter('active')
                    }}>Active</button>
                    <button onClick={() => {
                        props.changeFilter('completed')
                    }}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;