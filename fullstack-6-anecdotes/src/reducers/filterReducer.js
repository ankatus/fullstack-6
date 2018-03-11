
const initialState = ''

const reducer = (store = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return store
    }
}

export const filterSet = (filter) => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

export default reducer