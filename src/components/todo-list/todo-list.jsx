import React, {Component} from "react";
import { Droppable, Draggable} from "react-beautiful-dnd";

import ToDoListItem from "../todo-list__item/todo-list__item";
import TodoListFooter from "../todo-list__footer/todo-list__footer";

import './todo-list.css'

export default class TodoList extends Component {

    state = {
        dragElement: document.getElementById('root')
    }

    render() {
        const { todos, onDeleted , onToggleDone, toDo, filter, onFilterChange, clearCompleted, column} = this.props;
        const {dragElement} = this.state;
        const id = "1";
        const elements = column.numberIds.map((item, index) => {

            const {id, ...itemProps} = todos[item];

            return (
                <Draggable draggableId={id} index={index} key={id}>
                    {(provided) => (
                        <ToDoListItem
                            { ...itemProps }
                            {... provided.draggableProps}
                            {... provided.dragHandleProps}
                            innerRef={provided.innerRef}
                            provided={provided}
                            onDeleted = {() => onDeleted(id)}
                            onToggleDone = {() => onToggleDone(id)}
                        />
                    )}
                </Draggable>
            );
        });



        return (
            <div className="todo-list">
                <Droppable droppableId = {column.id}>
                    {(provided) => (
                        <ul className="todo-list__list"
                            {...provided.droppableProps}
                            ref = {provided.innerRef}
                        >
                            {elements}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <TodoListFooter
                    toDo = { toDo }
                    filter = { filter }
                    onFilterChange = { onFilterChange }
                    clearCompleted = { clearCompleted }
                />
            </div>

        );
    }
}

