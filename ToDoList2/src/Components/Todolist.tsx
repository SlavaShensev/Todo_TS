import React from "react";

type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
}

function Todolist(props: TodolistPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>JS</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>React</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
