import React from "react";
import {ValueFilterType} from "../App";

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsTYpe = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeFilter: (value: ValueFilterType) => void

}

const Todolist = (props: TodoListPropsTYpe) => {
    return <div>
        <div>
            <h3> {props.title} </h3>
        </div>
        <div>
            <input/>
            <button>
                +
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type='checkbox' checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}>
                        x
                    </button>
                </li>)
            }
        </ul>
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
}

export default Todolist