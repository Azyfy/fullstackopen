import React, { useState, useImperativeHandle } from "react"

const Toggleable = React.forwardRef ((props, ref) => {
    const [ visible, setVisible ] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

    return (
        <div>
            <div style={hideWhenVisible} >
                <button onClick={() => toggleVisible()} > Create new blog </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={() =>toggleVisible() }> Cancel </button>
            </div>
        </div>
    )

})

export default Toggleable