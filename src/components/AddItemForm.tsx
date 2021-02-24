import React, {ChangeEvent, useState} from 'react'
import {Button, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
    const onKeyPressHandler = (e: React.KeyboardEvent) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return <div>
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label='Title'
                helperText={error}
                variant={"outlined"}
            />

            <Button onClick={addItem}
                    color={"primary"}>
                <AddBox/>
            </Button>

        </div>
    </div>

}

export default AddItemForm