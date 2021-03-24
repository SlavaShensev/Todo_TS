import React from "react";

const Todolist = () => {
    return <div>
        <div>
            <h3>What to learn</h3>
        </div>
        <div>
            <input/>
            <button>
                +
            </button>
        </div>
        <ul>
            <li>
                <input type='checkbox' checked={true}/>
                <span>HTML&CSS</span>
            </li>
            <li>
                <input type='checkbox' checked={true}/>
                <span>JS</span>
            </li>
            <li>
                <input type='checkbox' checked={false}/>
                <span>React JS</span>
            </li>
        </ul>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
}

export default Todolist