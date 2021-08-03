const initialState = ""

const reducer = (state = initialState, action) => {
  //  console.log("action", action)
    switch(action.type) {
        case "FILTER":
            return action.content
        default:
            return initialState
    }
}

export const filter = (content) => {
    return {
        type: "FILTER",
        content
    }
}

export default reducer