import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EdittableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTitleTask: (id: string, title: string, todoListId: string) => void
}

function TodoList(props: ListTypeProps) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTitleTodoList = () => {
        props.changeTitleTask(props.id, props.title, props.title)
    }
    const onClickHandler = () => props.removeTodoList(props.id)
    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickActiveHandler = () => props.changeFilter('active', props.id)
    const onClickCompletedHandler = () => props.changeFilter('completed', props.id)
    return (
        <div className="List">
            <div>
                <h3>
                    <EditableSpan value={props.title} onChange={changeTitleTodoList}/>
                    <IconButton onClick={onClickHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            return <li key={t.id} className={t.isDone ? 'is_done' : ''}>
                                <input type={'checkbox'}
                                       checked={t.isDone}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                           const newIsDoneValue = e.currentTarget.checked
                                           props.changStatus(t.id, newIsDoneValue, props.id)
                                       }}
                                />
                                <EditableSpan value={t.title} onChange={addTask}/>
                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active_filter' : ''}
                            onClick={onClickAllHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active_filter' : ''}
                            onClick={onClickActiveHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active_filter' : ''}
                            onClick={onClickCompletedHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}


export default TodoList;