import contractDetails from './../configs/contractDetails'

const initState = {
    client: null,
    contractDetails,
    todos: []
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'ADD_TODO') {
        return {
            ...state,
            todos: [
                ...state.todos, {
                id: action.todo.id,
                title: action.todo.title,
                isCompleted: false
            }]
        }
    } else if(action.type === 'ADD_MANY_TODOS') {
        if (action.todos.length === 0) {
            return state;
        }

        return {
            ...state,
            todos: [
                ...state.todos, 
                ...action.todos
            ]
        }
    } else if (action.type === 'SET_CLIENT') {
        return {
            ...state,
            client: action.client
        }
    }

    return state;
}

export default rootReducer;