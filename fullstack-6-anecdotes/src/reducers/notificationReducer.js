
const initialState = ''

const reducer = (store = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return store
    }
}

export const notify = (notification, timeOut) => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, timeOut * 1000)
        dispatch(notificationSet(notification))
    }
}

export const notificationSet = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        notification
    }
}

export const notificationRemove = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export default reducer
