import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToDo from './ToDo';

export class ToDos extends Component {

    render() {
        const visibility = parseInt(this.props.visibility);

        return this.props.todos.map((todo) => {
            if(visibility === todo.isCompleted || visibility < 0) {
                return <ToDo key={ todo.id } todo={ todo }/>;
            }
        })
    }
}

const mapStateToPros = (state) => {
    return state;
}

export default connect(mapStateToPros)(ToDos)
