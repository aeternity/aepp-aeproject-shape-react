import React, { Component } from 'react'
import { connect } from 'react-redux'
import KEYS from './../configs/keys'

export class ToDo extends Component {

    getDataId = (e) => {
        return e.target.getAttribute('data-id');
    }

    onStateChange = async (e) => {

        const { client } = this.props;

        const id = this.getDataId(e);
        const newState = e.target.checked;

        await client.methods.edit_todo_state(id, newState);

        const editedState = {
            id: parseInt(id),
            isCompleted: newState
        }

        this.props.changeState(editedState)
    }

    onTitleDoubleClick = (e) => {
        const id = parseInt(this.getDataId(e));

        this.props.setEditable({ 
            id, 
            isEditable: true,
            title: e.target.value
        })
    }

    onTitleEdit = async (e) => {
        
        const id = parseInt(this.getDataId(e));
        const title = e.target.value;
        
        this.props.changeToDoTitle({
            id,
            title
        })
    }

    onTitleEditKeyDown = async (e) => {

        if(e.keyCode === KEYS.ENTER || e.keyCode === KEYS.ESCAPE){
            e.preventDefault();
            const id = parseInt(this.getDataId(e));
            let todoTitle = e.target.value;
            if(!todoTitle || todoTitle.trim() === '') {
                alert('Invalid to-do title!');
                return;
            }

            const todo = {
                id,
                title: todoTitle,
                isEditable: false,
            }

            if (e.keyCode === KEYS.ENTER) {
                const result = await this.props.client.methods.edit_todo_name(id, todoTitle);

                this.props.setEditable(todo);
            } else if (e.keyCode === KEYS.ESCAPE){
                this.props.discardTitleChanges({
                    id
                })
            }
        }
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

        const todo = this.props.todo;

        return (
            <div>
                <input 
                    type="checkbox" 
                    data-id={ todo.id } 
                    checked={ todo.isCompleted } 
                    onChange={ this.onStateChange }
                    />

                <input 
                    type="text" 
                    data-id={ todo.id }
                    value={ todo.editable ? todo.editedTitle : todo.title }
                    onDoubleClick={ this.onTitleDoubleClick }
                    onChange={ this.onTitleEdit }
                    readOnly={ !todo.editable }
                    autoFocus={ todo.editable }
                    onKeyDown={this.onTitleEditKeyDown}
                    />
                <span>  | is completed: { todo.isCompleted ? 'true' : 'false' }</span>
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
        },
        setEditable: (todo) => {
            dispatch({ type: "SET_EDITABLE_TITLE", todo });
        },
        discardTitleChanges: (todo) => {
            dispatch({ type: "DISCARD_TITLE_CHANGES", todo });
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(ToDo)
