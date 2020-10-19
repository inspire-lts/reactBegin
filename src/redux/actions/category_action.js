import {SAVE_CATEGORY} from '../action_types.js'


export const createSaveCategoryAction = (value) => {
   
    return {type:SAVE_CATEGORY, data:value}
}



