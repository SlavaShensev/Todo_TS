import React, {ChangeEvent, useState} from 'react'
import {Button} from "@material-ui/core";

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: any) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return <div>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
                   placeholder={'Add task'}
            />
            {/*<Button onClick={addItem}>+</Button>*/}
            <Button onClick={addItem}
                    variant={"contained"}
                    color={"primary"}
            >
                +
            </Button>
            {error && <div className={'error_message'}>{error}</div>}
        </div>
    </div>

}

export default AddItemForm