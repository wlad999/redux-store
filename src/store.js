import {createStore, compose, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";

const logMiddleware = (store) => (dispatch) => (action) => {
    console.log("action.type", action.type, store.getState())
    dispatch(action)
}
const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    dispatch(action)
}

// const logEnhancer = (createStore) => (...agrs) => {
//     const store = createStore(...agrs)
//     const originalDispatch = store.dispatch
//     store.dispatch = (action) => {
//         console.log("action.type", action.type)
//         originalDispatch(action)
//     }
//     return store
// }

// const stringEnhancer = (createStore) => (...agrs) => {
//     const store = createStore(...agrs)
//     const originalDispatch = store.dispatch
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return originalDispatch({
//                 type: action
//             })
//         }
//         originalDispatch(action)
//     }
//     return store
// }


// const store = createStore(reducer, compose(stringEnhancer, logEnhancer))
const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware))
store.dispatch("HELLO WORLD")
const myAction = (dispatch) => {
    setTimeout(() => dispatch({type: "DELAYED ACTION"}), 2000)
}

const delayedActionCreator = (timout) => (dispatch) => {
    setTimeout(() => dispatch({type: "DELAYED ACTION"}), timout)
}
store.dispatch(delayedActionCreator(2500))
export default store