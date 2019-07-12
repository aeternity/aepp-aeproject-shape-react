import React, { Component } from 'react'
import { connect } from 'react-redux'

const arr = [
    { type: 'All', value: -1 },
    { type: 'Active', value: 0 },
    { type: 'Completed', value: 1 },
]

export class Filter extends Component {

    filterTodos = (e) => {
        console.log('filterTodos')
    }

    render() {
        return (
            <div>
                {
                    arr.map(visibility => {
                        return <span><a 
                        href='about:blank' 
                        data-visibility-value={ visibility.value }
                        onClick={this.filterTodos}>
                        { visibility.type }
                        </a></span>
                    })
                }
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return state;
}

export default connect(mapStateToPros)(Filter)
