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
            'all': {
                id: 'column-1',
                numberIds: []
            },
            'active': {
                id: 'column-1',
                numberIds: []
            },
            'completed': {
                id: 'column-1',
                numberIds: []
            },
        },
        todoData: { },
        filter: 'all',
        theme: 'light'
    };

    deleteData = (id, column, filter) => {

        const idx = column[filter].numberIds.findIndex((el) => el === id);
        const result = [...column[filter].numberIds.slice(0, idx) ,
            ...column[filter].numberIds.slice(idx+1)];

        const newColumn = {
            ... column[filter],
            numberIds: result
        }

        return newColumn;
    }

    deleteElement = (id) => {

        const {todoData, column, filter} = this.state;
        const idx = column[filter].numberIds.findIndex((el) => el === id);

        const shallowCopy = {...todoData}
        delete shallowCopy[column[filter].numberIds[idx]]

        const newAllColumn = this.deleteData(id, column, "all");
        const newActiveColumn = this.deleteData(id, column, "active");
        const newDoneColumn = this.deleteData(id, column, "completed");

        const newColumn = {
            'all': newAllColumn,
            'active': newActiveColumn,
            'completed': newDoneColumn
        }

        const newState = {
            ...this.state,
            column: newColumn,
            todoData: shallowCopy
        }

        this.setState(newState);
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

            const newAllTaskIds = [...column["all"].numberIds, String(newId)]
            const newActiveTaskIds = [...column["active"].numberIds, String(newId)]

            const newAllColumn = {
                ...column['all'],
                numberIds: newAllTaskIds
            }
            const newActiveColumn = {
                ...column['active'],
                numberIds: newActiveTaskIds
            }

            const newColumn = {
                ...column,
                'active': newActiveColumn,
                'all': newAllColumn
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
        this.setState(({todoData, column, filter}) => {
            const idx = column[filter].numberIds.find((el) => el === id);
            const activeIdx = column['active'].numberIds.findIndex((el) => el === id);
            const doneIdx = column['completed'].numberIds.findIndex((el) => el === id);
            const oldItem = todoData[idx];

            const newActive = oldItem.done ?
                [...column['active'].numberIds, id] :
                [...column['active'].numberIds.slice(0, activeIdx),
                    ...column['active'].numberIds.slice(activeIdx + 1)];
            const newDone = !oldItem.done ?
                [...column['completed'].numberIds, id] :
                [...column['completed'].numberIds.slice(0, doneIdx),
                    ...column['completed'].numberIds.slice(doneIdx + 1)];

            const newActiveColumn = {
                ...column['active'],
                numberIds: newActive
            }
            const newDoneColumn = {
                ...column['completed'],
                numberIds: newDone
            }

            const newColumn = {
                ...column,
                'active': newActiveColumn,
                'completed': newDoneColumn
            }

            const newItem = {
                ...oldItem,
                done: !oldItem.done
            }

            const result = {
                ...todoData,
                [idx]: newItem
            }

            return {
                column: newColumn,
                todoData: result
            }
        });
    }

    filter = (items, column, filter) => {

        switch (filter){
            case "all":
            {
                const elements = items;
                const visibleColumn = column[filter];
                return {visibleColumn, elements};
            }
            case "active":
            {
                let elements = {}
                const newIds = column[filter].numberIds.filter((el) => !items[el].done);
                newIds.forEach((el) => elements[el] = items[el]);
                const visibleColumn = { ... column[filter], numberIds: newIds};
                return {visibleColumn, elements };
            }

            case "completed":
            {
                let elements = {}
                const newIds = column[filter].numberIds.filter((el) => items[el].done);
                newIds.forEach((el) => elements[el] = items[el]);
                const visibleColumn = { ... column[filter], numberIds: newIds}
                return {visibleColumn, elements };
            }
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    clearCompleted = () => {
        const {todoData, column} = this.state;
        const newData = {}
        const newAll = column['all'].numberIds.filter((el) => !todoData[el].done)
        column['active'].numberIds.forEach((el) => newData[el] = todoData[el]);

        const newAllColumn = {
            ...column['all'],
            numberIds: newAll
        }
        const newDoneColumn = {
            ...column['completed'],
            numberIds: []
        }

        const newColumn = {
            ...column,
            'all': newAllColumn,
            'completed': newDoneColumn
        }
        const newState = {
            ...this.state,
            column: newColumn,
            todoData: newData
        }

        this.setState(newState);
    }

    onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        const {column, filter} = this.state;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index){
            return;
        }

        const newTaskIds = Array.from(column[filter].numberIds);

        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newFilteredColumn = {
            ... column[filter],
            numberIds: newTaskIds
        }

        const newColumn = {
            ...column,
            [filter]: newFilteredColumn
        }

        const newState = {
            ...this.state,
            column: newColumn
        }

        this.setState(newState);

    }

    themeChange = () => {
        this.setState(({theme}) => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            return{
                theme: newTheme
            }
        })
    }


    render() {

        const {todoData, filter, column, theme} = this.state;
        const {visibleColumn, elements} = this.filter(todoData, column, filter);
        const toDo = column['active'].numberIds.length;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={'app ' + theme}>
                    <AppHeader
                        themeChange={this.themeChange}
                    />
                    <AddPanel onAdd={this.addElement}/>
                    <TodoList
                        todos = {elements}
                        onDeleted = {this.deleteElement}
                        onToggleDone = {this.onToggleDone}
                        toDo = {toDo}
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


