import {SAVE_PROD_LIST} from '../action_types.js'


export const createSaveProductAction = (value) => {
   
    return {type:SAVE_PROD_LIST, data:value}
}



