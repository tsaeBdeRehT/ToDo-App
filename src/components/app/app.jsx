import React, { Component } from "react";
import {DragDropContext} from "react-beautiful-dnd";

import AppHeader from "../app-header/app-header";
import AddPanel from "../add-panel/add-panel";
import TodoList from "../todo-list/todo-list";
import TodoListFilter from "../todo-list__filter/todo-list__filter";

import './app.css'

export default class App extends Component {

    maxID = 100;

    state = {
        column: {
            id: 'column-1',
            numberIds: ['1', '2', '3']
        },
        todoData: {
            '1': {label: "123", done: false, id: '1'},
            '2': {label: "345", done: false, id: '2'},
            '3': {label: "456", done: false, id: '3'}
        },
        filter: 'all',
    };

    deleteElement = (id) => {
        this.setState(({todoData, column}) => {
            const idx = column.numberIds.findIndex((el) => el === id);
            const result = [...column.numberIds.slice(0, idx) ,
                ...column.numberIds.slice(idx+1)];

            const shallowCopy = {...todoData}
            delete shallowCopy[column.numberIds[idx]]

            const newColumn = {
                ... this.state.column,
                numberIds: result
            }

            const newState = {
                ...this.state,
                column: newColumn,
                todoData: shallowCopy
            }
            return(newState);
        });
    };

    addElement = (text) => {
        this.setState(({todoData, column}) => {
            const newId = this.maxID++;

            const newItem = {
                label: text,
                done: false,
                id: String(newId)
            }

            const result = {...todoData,
                [newId]: newItem};

            const newTaskIds = [...column.numberIds, String(newId)]

            const newColumn = {
                ...column,
                numberIds: newTaskIds
            }

            const newState = {
                ...this.state,
                column: newColumn,
                todoData: result
            }

            return (
                newState
            )
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData, column}) => {
            const idx = column.numberIds.find((el) => el === id);
            const oldItem = todoData[idx];

            const newItem = {
                ...oldItem,
                done: !oldItem.done
            }

            const result = {
                ...todoData,
                [idx]: newItem
            }

            return {
                todoData: result
            }
        });
    }

    filter = (items, column, filter) => {

        switch (filter){
            case "all":
            {
                const elements = items;
                const visibleColumn = column;
                return {visibleColumn, elements};
            }
            case "active":
            {
                let elements = {}
                const newIds = column.numberIds.filter((el) => !items[el].done);
                newIds.forEach((el) => elements[el] = items[el]);
                const visibleColumn = { ... column, numberIds: newIds};
                return {visibleColumn, elements };
            }

            case "completed":
            {
                let elements = {}
                const newIds = column.numberIds.filter((el) => items[el].done);
                newIds.forEach((el) => elements[el] = items[el]);
                const visibleColumn = { ... column, numberIds: newIds}
                return {visibleColumn, elements };
            }
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

    onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index){
            return;
        }

        const newTaskIds = Array.from(this.state.column.numberIds);

        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ... this.state.column,
            numberIds: newTaskIds
        }

        const newState = {
            ...this.state,
            column: newColumn
        }

        this.setState(newState);

    }

    render() {

        const {todoData, filter, column} = this.state;
        const {visibleColumn, elements} = this.filter(todoData, column, filter);

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className='app'>
                    <AppHeader />
                    <AddPanel onAdd={this.addElement}/>
                    <TodoList
                        todos = {elements}
                        onDeleted = {this.deleteElement}
                        onToggleDone = {this.onToggleDone}
                        toDo = {1}
                        filter = {filter}
                        onFilterChange = {this.onFilterChange}
                        clearCompleted = {this.clearCompleted}
                        column={visibleColumn}
                    />
                    <TodoListFilter
                        filter = {filter}
                        onFilterChange = {this.onFilterChange}
                        className="mobile"
                    />
                </div>
            </DragDropContext>
        );
    }
}


