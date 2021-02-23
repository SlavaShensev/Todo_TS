import React from "react";

type EdittableSpanTypeProps = {
    value: string
}

function EditableSpan(props: EdittableSpanTypeProps) {

    return <span>
        {props.value}
    </span>


}

export default EditableSpan