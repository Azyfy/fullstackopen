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
        setTimeout(() => { 
            dispatch(removeMessage())
        }, time * 100);
        
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