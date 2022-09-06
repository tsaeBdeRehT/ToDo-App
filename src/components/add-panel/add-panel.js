import React, {Component} from "react";

import './add-panel.css';

export default class AddPanel extends Component {
    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}>
                <input
                    placeholder="Create a new todo..."
                    type="text"
                    value={this.state.label}
                    onChange={this.onLabelChange}
                    className="add-panel"/>
            </form>

        );
    };
}
