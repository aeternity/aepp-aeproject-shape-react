import contractDetails from './../configs/contractDetails'
import visibility from './../configs/visibility'

const initState = {
    client: null,
    contractDetails,
    visibility: visibility.ALL,
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
                isCompleted: visibility.ACTIVE
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
    } else if (action.type === 'CHANGE_TODO_STATE') {

        state.todos.map(todo => {
            if(todo.id === action.todo.id) {
                todo.isCompleted = action.todo.isCompleted;
            }
        })

        return {
            ...state,
            todos: [ ...state.todos ]
        }
    }

    return state;
}

export default rootReducer;