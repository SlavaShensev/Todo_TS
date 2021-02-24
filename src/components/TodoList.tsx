import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EdittableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
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
    changeTitleTodoList: (todoListId: string, title: string) => void
}

function TodoList(props: ListTypeProps) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTitleTodoList = (title: string) => {

        props.changeTitleTodoList(props.id, title)

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
                <div>

                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            return <div key={t.id} className={t.isDone ? 'is_done' : ''}>
                                <Checkbox
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
                            </div>
                        })
                    }
                </div>
                <div>
                    <Button className={props.filter === 'all' ? 'active_filter' : ''}
                            onClick={onClickAllHandler}
                            color={"default"}
                    >All
                    </Button>
                    <Button className={props.filter === 'active' ? 'active_filter' : ''}
                            onClick={onClickActiveHandler}
                            color={"inherit"}
                    >Active
                    </Button>
                    <Button className={props.filter === 'completed' ? 'active_filter' : ''}
                            onClick={onClickCompletedHandler}
                            color={"secondary"}
                    >Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default TodoList;