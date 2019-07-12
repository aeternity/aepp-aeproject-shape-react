import React, { Component } from 'react'

export class ToDo extends Component {

    onAdd() {
        console.log('on add')
    }

    onStateChange() {
        console.log('on state change')
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

        return (
            <div>
                <span>{ this.props.todo.title }</span> | 
                <span> is completed: { this.props.todo.isCompleted ? 'true' : 'false' }</span>
            </div>
        )
    }
}

export default ToDo
