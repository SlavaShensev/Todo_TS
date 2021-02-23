import React, {useState} from "react";

type EdittableSpanTypeProps = {
    value: string
}

function EditableSpan(props: EdittableSpanTypeProps) {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => setEditMode(!editMode)

    return editMode
        ? <input value={props.value} autoFocus={true} />
        : <span onDoubleClick={activateEditMode} >
                {props.value}
            </span>


}

export default EditableSpan