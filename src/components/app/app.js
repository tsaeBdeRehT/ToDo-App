import React, { Component } from "react";

import AppHeader from "../app-header/app-header";
import AddPanel from "../add-panel/add-panel";
import TodoList from "../todo-list/todo-list";

import './app.css'

export default class App extends Component {
    maxID = 100;

    state = {
        todoData: [],
        filter: 'all'
    };

    deleteElement = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const result = [...todoData.slice(0, idx) ,
                ...todoData.slice(idx+1)];

            return {
                todoData: result
            };
        });
    };

    addElement = (text) => {
        const newItem = {
            label: text,
            done: false,
            id: this.maxID++
        }

        this.setState(({todoData}) => {
            const result = [...todoData, newItem];

            return {
                todoData: result
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[idx];
            const newItem = {
                ...oldItem,
                done: !oldItem.done
            }

            const result = [...todoData.slice(0, idx) ,
                newItem,
                ...todoData.slice(idx+1)];

            return {
                todoData: result
            }
        });
    }

    filter = (items, filter) => {
        switch (filter){
            case "all":
                return items;

            case "active":
                return items.filter((el) => !el.done);

            case "completed":
                return items.filter((el) => el.done);
            default:
                return items
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    clearCompleted = () => {
        this.setState(({todoData}) => {
            const result = todoData.filter((el) => el.done === false);

            return {
                todoData: result
            }
        });
    }

    render() {

        const {todoData, filter} = this.state;
        const todoLeft = todoData.filter((el) => el.done === false).length;
        const VisibleItems = this.filter(todoData, filter);

        return (
            <div className='app'>
                <AppHeader />
                <AddPanel onAdd={this.addElement}/>
                <TodoList
                    todos = {VisibleItems}
                    onDeleted = {this.deleteElement}
                    onToggleDone = {this.onToggleDone}
                    toDo = {todoLeft}
                    filter = {filter}
                    onFilterChange = {this.onFilterChange}
                    clearCompleted = {this.clearCompleted}
                />
            </div>
        );
    }
}


