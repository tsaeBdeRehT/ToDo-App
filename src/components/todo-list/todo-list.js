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
        const { todos, onDeleted , onToggleDone, toDo, filter, onFilterChange, clearCompleted} = this.props;
        const {dragElement} = this.state;
        const id = "1";
        const elements = todos.map((item, index) => {
            console.log(item, index)

            const {id, ...itemProps} = item;
            const draggableId = String(id);
            return (
                <Draggable draggableId={draggableId} index={index} key={id}>
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

        const onDragOver = (ev) => {
            ev.preventDefault();

            const currentElement = ev.target.closest('li');


            if (currentElement !== dragElement ) {

                const nextElement =
                    (currentElement === dragElement.nextElementSibling) ?
                        currentElement.nextElementSibling : currentElement;

            }
        }



        const onDragEnd = (result) => {
            if (!result.destination){
                return;
            }

            console.log(1);
        }

        const listTag = 'div'

        return (
            <div className="todo-list">
                <Droppable droppableId = {id}>
                    {(provided) => (
                        <ul className="todo-list__list"
                            {...provided.droppableProps}
                            ref = {provided.innerRef}
                        >
                            {elements}
                            {provided.placeholder}
                        </ul>
                        // <div
                        //     className="todo-list__list"
                        //     innerRef = {provided.innerRef}
                        //     {...provided.droppableProps}
                        // >
                        //     {elements}
                        //     {provided.placeholder}
                        // </div>
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

