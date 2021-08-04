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

export const notify = (message, time) => {
    return async dispatch => {
        dispatch(displayMessage(message))

        function callTimeOut () {
            window["reload_timer"] = setTimeout(() => {
                    dispatch(removeMessage())
                }, time * 100)
        }
        
        clearTimeout(window["reload_timer"])
        callTimeOut()
    }
}


const displayMessage = (message) => {
  return {
        type:"NOTIFY",
        message
    }
       }

const removeMessage = () => {
    return  {
         type:"REMOVE",
     }
        }


export default reducer