import React, { Component } from 'react'
import { Aepp } from '@aeternity/aepp-sdk'
import { connect } from 'react-redux'
import ToDos from './ToDos'
import uuid from 'uuid/v4'

export class ToDoManager extends Component {

    async getReverseWindow() {
        const iframe = document.createElement('iframe')
        iframe.src = prompt('Enter wallet URL', 'http://localhost:8081')
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        await new Promise(resolve => {
            const handler = ({ data }) => {
                if (data.method !== 'ready') return
                window.removeEventListener('message', handler)
                resolve()
            }
            window.addEventListener('message', handler)
        })
        return iframe.contentWindow
    }

    async getClient() {
        try {
            const { contractDetails } = this.props;

            // Aepp approach
            this.client = await Aepp({
                parent: this.runningInFrame ? window.parent : await this.getReverseWindow()
            });
            
            this.contractInstance = await this.client.getContractInstance(contractDetails.contractSource, { contractAddress: contractDetails.contractAddress });

            return this.contractInstance;

        } catch (err) {
            console.log(err);
        }
    }

    async getToDos(instance) {
        const allToDosResponse = await instance.call("get_todos", []);
        const allToDos = await allToDosResponse.decode();
        const parsedToDos = this.convertSophiaListToTodos(allToDos);

        return parsedToDos;
    }

    convertToTODO = (data) => {
        return {
            title: data.name,
            isCompleted: data.is_completed
        }
    }

    convertSophiaListToTodos(data) {
        let tempCollection = [];
        let taskId;

        for (let dataIndex in data) {
            let todoInfo = data[dataIndex];

            taskId = todoInfo[0];
            let todo = this.convertToTODO(todoInfo[1]);
            todo.id = taskId;

            tempCollection.push(todo);
        }

        return tempCollection;
    }

    addTodo = async (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
            let todo = e.target.value;
            e.target.value = '';
            if(!todo || todo === '') {
                alert('Invalid to-do title!');
                return;
            }

            let result = await this.props.client.call('add_todo', [todo]);
            todo = {
                id: result.decodedResult,
                title: todo
            }

            this.props.addTodo(todo);
        }
    }

    async componentDidMount() {

        const contractInstance = await this.getClient();
        this.props.setClient(contractInstance)

        const todos = await this.getToDos(contractInstance);
        this.props.addManyTodos(todos);
    }
    
    render() {

        /*
        
        <ul className="todo-list">
                            <li v-for="(todo, i) in visibleTasks"
                                // @click="toggleTaskStatus(todo.id)"
                                className="todo"
                                // :key="`${i}-${todo.id}`"
                                // :className="{ completed: todo.isCompleted, editing: todo == editedTodo }"
                                >
                            <div className="view">
                                <input 
                                    className="toggle" 
                                    type="checkbox" 
                                    // @click.prevent 
                                    v-model="todo.isCompleted"
                                />
                                <label 
                                    // @dblclick="editTodo(todo)"
                                    >{todo.title}
                                </label>
                            </div>
                                <input className="edit" type="text"
                                    v-model="todo.title"
                                    v-todo-focus="todo == editedTodo"
                                    // @blur="doneEdit(todo)"
                                    // @keyup.enter="doneEdit(todo)"
                                    // @keyup.esc="cancelEdit(todo)"
                                />
                            </li>
                        </ul>

        */

        return (
            <div>
                <section key={ uuid() } className="todoapp" style={todoStyle}>
		            <div className="add-todo">
                        
                        <input className="new-todo"
                            autoFocus autoComplete="off"
                            placeholder="What needs to be done?"
                            onKeyDown={this.addTodo}
                        />
		            </div>
                    <section key={ uuid() } className="main" v-show="allToDos.length" >
                        <ToDos key={ uuid() } todos={ this.props.todos }/>
                    </section>
                    <footer className="footer" v-show="allToDos.length" >
                        <span className="todo-count">
                            {/* <strong>{ remaining }</strong> {{ remaining | pluralize }} left */}
                        </span>
                        {/* <ul className="filters"> */}
                            {/* <li><a @click="manageVisibility('all')" :className="{ selected: visibility == 'all' }">All</a></li>
                            <li><a @click="manageVisibility('active')" :className="{ selected: visibility == 'active' }">Active</a></li>
                            <li><a @click="manageVisibility('completed')" :className="{ selected: visibility == 'completed' }">Completed</a></li> */}
                        {/* </ul> */}
                    </footer>
                </section>
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (todo) => {
            dispatch({ type: "ADD_TODO", todo: todo });
        },
        addManyTodos: (todos) => {
            dispatch({ type: "ADD_MANY_TODOS", todos });
        },
        setClient: (client) => {
            dispatch({
                type: "SET_CLIENT",
                client
            })
        }
    }
}

// styles
const todoStyle = {
    color: '#000'
}


export default connect(mapStateToPros, mapDispatchToProps)(ToDoManager)
