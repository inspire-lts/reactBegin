import {SAVE_PROD_LIST} from '../action_types.js'


let initState = []
export default function test(preState=initState, action){
    const {type, data} = action
    let newState
    switch (type) {
        case SAVE_PROD_LIST:
            newState = [...data]
            return newState 
        default:
            return preState
    }
}