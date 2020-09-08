import {createStore, compose} from "redux";
import reducer from "./reducers";

const logEnhancer = (createStore) => (...agrs) => {
    const store = createStore(...agrs)
    const originalDispatch = store.dispatch
    store.dispatch = (action) => {
        console.log("action.type", action.type)
        originalDispatch(action)
    }
    return store
}

const stringEnhancer = (createStore) => (...agrs) => {
    const store = createStore(...agrs)
    const originalDispatch = store.dispatch
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            })
        }
        originalDispatch(action)
    }
    return store
}


const store = createStore(reducer, compose(stringEnhancer, logEnhancer))
export default store