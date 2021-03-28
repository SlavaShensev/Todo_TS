import React, {ChangeEvent, useState} from "react";

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
        ? <input value={title}
                 onChange={onChangeHandler}
                 onBlur={activateViewMode}
                 autoFocus

        />
        : <span onDoubleClick={activateEditMode}>
            {title}
    </span>

}

export default EditableSpan