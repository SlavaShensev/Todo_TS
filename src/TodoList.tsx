import React, {ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type ListTypeProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskTitle: string) => void

}

function TodoList(props: ListTypeProps) {

    const [title, setTitle] = useState<string>('')
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const all = () => {
        props.changeFilter('all')
    }

    const active = () => {
        props.changeFilter('active')
    }

    const completed = () => {
        props.changeFilter('completed')
    }

    return (
        <div className="List">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               setTitle(e.currentTarget.value)
                           }}
                           onKeyPress={(e) => {
                               if (e.key === 'Enter') addTask()
                           }}
                    />
                    <button onClick={addTask}>+
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
                        all()
                    }}>All
                    </button>
                    <button onClick={() => {
                        active()
                    }}>Active
                    </button>
                    <button onClick={() => {
                        completed()
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;