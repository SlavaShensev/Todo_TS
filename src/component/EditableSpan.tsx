import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    changeTitle: () => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.value)
    const [editMode, setEditMode] = useState(false)


    const activateEditMode = () => {
        setEditMode(true)

    }

    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitle()

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
        ? <TextField value={title}
                     color={'primary'}
                     variant={'outlined'}
                     onChange={onChangeHandler}
                     onBlur={activateViewMode}
                     autoFocus

        />
        : <span onDoubleClick={activateEditMode}>
            {title}
    </span>

}

export default EditableSpan