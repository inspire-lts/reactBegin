import {SAVE_TITLE} from '../action_types.js'


export const createSaveTitleActon = (value) => {
    return {type:SAVE_TITLE, data:value}
}


