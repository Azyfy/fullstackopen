const initialState = "render here notification..."

const reducer = (state = initialState, action) => {
    console.log('action', action)
    switch(action.type) {
        case "NOTIFY":
            return action.message
        default:
            return state
    }
}

export default reducer