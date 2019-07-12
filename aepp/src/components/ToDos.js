import React, { Component } from 'react'
import ToDo from './ToDo'

export class ToDos extends Component {

    render() {
        return this.props.todos.map((todo) => (
            <ToDo key={ todo.id } todo={ todo }/>
        ))
    }
}

export default ToDos
