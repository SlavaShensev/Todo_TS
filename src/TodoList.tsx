import React, {useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type ListTypeProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

function TodoList(props: ListTypeProps) {
    const [title, setTitle] = useState('')
    const addTask = () => {
        props.addTask(title)
        setTitle('')

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
                           onKeyPress={(e) => {
                               if (e.charCode === 13) {
                                   addTask()
                               }
                           }}
                    />
                    <button onClick={addTask}
                    >+
                    </button>
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