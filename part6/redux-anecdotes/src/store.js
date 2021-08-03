import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notficationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notficationReducer,
    filter: filterReducer
})

export const store = createStore(reducer,
    composeWithDevTools())