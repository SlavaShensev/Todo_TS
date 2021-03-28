import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

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
        <TextField value={title}
                   variant={'outlined'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   label={'Title'}
                   helperText={error}
        />
        <IconButton color={"primary"} onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
}

export default AddItemForm