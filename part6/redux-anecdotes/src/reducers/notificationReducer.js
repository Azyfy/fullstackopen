const initialState = "none"

const reducer = (state = initialState, action) => {
 //   console.log('action notify', action)
    switch(action.type) {
        case "NOTIFY":
            return action.message
        case "REMOVE":
            return "none"
        default:
            return state
    }
}

export const displayMessage = (message) => {
    return {
        type:"NOTIFY", 
        message
    }
}

export const removeMessage = () => {
    return {
        type:"REMOVE"
    }
}

export default reducer