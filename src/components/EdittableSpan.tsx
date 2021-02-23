import React, {ChangeEvent, useState} from "react";

type EdittableSpanTypeProps = {
    value: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: EdittableSpanTypeProps) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)
    const activateEditModeON = () => {
        setEditMode(!editMode)
    }
    const activateEditModeOFF = () => {
        setEditMode(!editMode)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode
        ? <input value={title}
                 autoFocus
                 onBlur={activateEditModeOFF}
                 onChange={onChangeHandler}
        />
        : <span onDoubleClick={activateEditModeON}>
                {props.value}
            </span>
}

export default EditableSpan