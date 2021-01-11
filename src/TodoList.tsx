import React from "react";
import {filterValuesType, TaskType} from "./App";

type ListTypeProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (newFilterValue: filterValuesType) => void
}

function TodoList(props: ListTypeProps) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id)
        }
        return (
            <div key={'_key: ' + t.id}>
                <input type={'checkbox'} checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>
                    X
                </button>
            </div>
        )
    })

    return (
        <div className="TodoList">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasks}
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