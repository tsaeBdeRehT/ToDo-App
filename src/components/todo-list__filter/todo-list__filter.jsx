import React, {Component} from "react";

import './todo-list__filter.css'

export default class TodoListFilter extends Component{

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'}
    ]

    render() {
        const {filter = "all", onFilterChange, className} = this.props;

        const buttons = this.buttons.map((item) => {
            const {name, label} = item;
            const isActive = filter === name;
            const className = isActive ? 'active' : '';

            return (
                <button
                    key={name}
                    className={"filter-button " + className}
                    onClick={() => onFilterChange(name)}
                >
                    {label}
                </button>
            );
        })

        return (
            <div className={"todo-list__filter " + className}>
                {buttons}
            </div>
        );
    };
}

