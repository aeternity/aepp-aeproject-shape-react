import React, { Component } from 'react'
import { Aepp } from '@aeternity/aepp-sdk'
import contractDetails from './../configs/contractDetails'

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

            contractDetails.contractAddress = 'ct_HVb6d4kirgqzY1rShmzRTRwukcsXobjHcpLVD2EggoHmn6wt2'

            // Aepp approach
            this.client = await Aepp({
                parent: this.runningInFrame ? window.parent : await this.getReverseWindow()
            });

            console.log(this.client)

            // this.$store.dispatch('setAccount', this.client);
            this.contractInstance = await this.client.getContractInstance(contractDetails.contractSource, { contractAddress: contractDetails.contractAddress });

            const todos = await this.getToDos(this.contractInstance)
            console.log('==> todos');
            console.log(todos);

        } catch (err) {
            console.log(err);
        }
    }

    async getToDos(instance) {
        console.log(1)
        const allToDosResponse = await instance.call("get_todos", []);
        const allToDos = await allToDosResponse.decode();
        // const parsedToDos = this.convertSophiaListToTodos(allToDos);
        
        // this.$store.dispatch('setToDos', parsedToDos);

        return allToDos;
    }
    
    render() {

        const todo = {
            title: 'to do title'
        }

        this.getClient().then(r => {
            console.log(r);
        }).catch(e => {
            console.log(e)
        })

        return (
            <div>
                <section className="todoapp">
		            <div className="header">
                        {/* <!--<h1>todos</h1>--> */}
                        <input className="new-todo"
                            autoFocus autoComplete="off"
                            placeholder="What needs to be done?"
                            v-model="newTodo"
                            // @keyup.enter="addTodo"
                        />
		            </div>
                    <section className="main" v-show="allToDos.length" >
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
                    </section>
                    <footer className="footer" v-show="allToDos.length" >
                        <span className="todo-count">
                            {/* <strong>{ remaining }</strong> {{ remaining | pluralize }} left */}
                        </span>
                        <ul className="filters">
                            {/* <li><a @click="manageVisibility('all')" :className="{ selected: visibility == 'all' }">All</a></li>
                            <li><a @click="manageVisibility('active')" :className="{ selected: visibility == 'active' }">Active</a></li>
                            <li><a @click="manageVisibility('completed')" :className="{ selected: visibility == 'completed' }">Completed</a></li> */}
                        </ul>
                    </footer>
                </section>
            </div>
        )
    }
}

export default ToDoManager
