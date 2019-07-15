import React, { Component } from 'react'
import { connect } from 'react-redux'

const arr = [
    { name: 'All', type: -1 },
    { name: 'Active', type: 0 },
    { name: 'Completed', type: 1 },
]

export class Filter extends Component {

    getVisibilityType = (e) => {
        return e.target.getAttribute('data-visibility-type');
    }

    changeVisibility = (e) => {
        e.preventDefault();
        this.props.changeVisibility(this.getVisibilityType(e))
    }

    render() {
        return (
            <div>
                {
                    arr.map(visibility => {
                        return <span><a 
                        href='about:blank' 
                        data-visibility-type={ visibility.type }
                        onClick={this.changeVisibility}>
                        { visibility.name }
                        </a> </span>
                    })
                }
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeVisibility: (visibility) => {
            dispatch({ type: "CHANGE_VISIBILITY", visibility });
        }
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(Filter)
