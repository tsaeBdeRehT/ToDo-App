import React, {Component} from "react";

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

        const elements = todos.map((item) => {

            const {id, ...itemProps} = item;

            return (
                <li key={id} draggable="true">
                    <ToDoListItem
                        { ...itemProps }
                        onDeleted = {() => onDeleted(id)}
                        onToggleDone = {() => onToggleDone(id)}
                    />
                </li>
            );
        });

        const onDragOver = (ev) => {
            ev.preventDefault();

            const currentElement = ev.target;

            if (currentElement !== dragElement &&  currentElement.classList.contains("todo-list__item")) {
                const list = document.getElementById('list');
                const nextElement =
                    (currentElement === dragElement.parentNode.nextSibling) ?
                        currentElement.parentNode.nextSibling : currentElement.parentNode;

                list.insertBefore(dragElement, nextElement);
            }
        }

        const onDragStart = (ev) => {
            ev.target.classList.add('selected');
            this.setState({
                dragElement: ev.target
            })

        }

        const onDragEnd = (ev) => {
            ev.target.classList.remove('selected');
            this.setState({
                dragElement: ""
            })
        }

        return (
            <ul
                className="todo-list"
                id="list"
                onDragOver={onDragOver}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                {elements}
                <TodoListFooter
                    toDo = { toDo }
                    filter = { filter }
                    onFilterChange = { onFilterChange }
                    clearCompleted = { clearCompleted }
                />
            </ul>
        );
    }
}

