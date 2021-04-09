import React, {ChangeEvent} from "react";
import {ValueFilterType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import Button from '@material-ui/core/Button';
import {Delete} from '@material-ui/icons';
import {Checkbox, IconButton} from "@material-ui/core";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    id: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: ValueFilterType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter: string
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    addTodoListTitle: (id: string, title: string) => void
}

const Todolist = (props: TodoListPropsType) => {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return <div>
        <div>
            <h3>
                <EditableSpan value={props.title} changeTaskTitle={props.changeTaskTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
        </div>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    return (
                        <div key={t.id}
                             className={t.isDone ? 'is-done' : ''}
                        >
                            <Checkbox
                                checked={t.isDone}
                                onChange={onChangeHandler}
                                color={'primary'}
                            />
                            <EditableSpan value={t.title} changeTaskTitle={props.changeTaskTitle}/>

                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })
            }
        </div>
        <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={onAllClickHandler}
        >
            All
        </Button>
        <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={onActiveClickHandler}>
            Active
        </Button>
        <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={onCompletedClickHandler}>
            Completed
        </Button>
    </div>
}

export default Todolist