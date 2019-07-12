import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ToDo extends Component {

    onStateChange = async (e) => {

        const { client } = this.props;

        const id = e.target.getAttribute('data-id');
        const newState = e.target.checked;

        await client.methods.edit_todo_state(id, newState);

        const editedState = {
            id: parseInt(id),
            isCompleted: newState
        }

        this.props.changeState(editedState)
    }

    onTitleEdit() {
        console.log(`edit todo's title`)
    }

    render() {

        /*
        <li v-for="(todo, i) in visibleTasks"
                                // @click="toggleTaskStatus(todo.id)"
                                className="todo"
                                // :key="`${i}-${todo.id}`"
                                // :className="{ completed: todo.isCompleted, editing: todo == editedTodo }"
                                />
        */ 

        const todo = this.props.todo

        return (
            <div>
                <input 
                    type="checkbox" 
                    data-id={ todo.id } 
                    checked={ todo.isCompleted } 
                    onChange={ this.onStateChange }
                    />
                <span onDoubleClick={ this.onTitleEdit }>{ todo.title }</span> | 
                <span> is completed: { todo.isCompleted ? 'true' : 'false' }</span>
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeState: (todo) => {
            dispatch({ type: "CHANGE_TODO_STATE", todo });
        },
        changeToDoTitle: (todo) => {
            dispatch({ type: "CHANGE_TODO_TITLE", todo });
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(ToDo)
