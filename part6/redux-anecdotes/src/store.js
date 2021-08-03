import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notficationReducer from "./reducers/notificationReducer"

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notficationReducer
})

export const store = createStore(reducer,
    composeWithDevTools())