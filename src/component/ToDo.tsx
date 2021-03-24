import React from "react";

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsTYpe = {
    title: string
    tasks: Array<TasksType>
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
            <li>
                <input type='checkbox' checked={props.tasks[0].isDone}/>
                <span>{props.tasks[0].title}</span>
            </li>
            <li>
                <input type='checkbox' checked={props.tasks[1].isDone}/>
                <span>{props.tasks[1].title}</span>
            </li>
            <li>
                <input type='checkbox' checked={props.tasks[2].isDone}/>
                <span>{props.tasks[2].title}</span>
            </li>
        </ul>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
}

export default Todolist