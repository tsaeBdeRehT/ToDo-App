import React, {Component} from "react";

import ToDoListItem from "../todo-list__item/todo-list__item";
import TodoListFooter from "../todo-list__footer/todo-list__footer";

import './todo-list.css'

export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.taskList = React.createRef();
    }

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

            const currentElement = ev.target.closest('li');

            if (currentElement !== dragElement ) {
                const list = this.taskList.current;
                const nextElement =
                    (currentElement === dragElement.nextElementSibling) ?
                        currentElement.nextElementSibling : currentElement;
                list.insertBefore(dragElement, nextElement);
            }
        }

        const onDragStart = (ev) => {
            const el = ev.target.closest('li');
            el.classList.add('selected');
            this.setState({
                dragElement: el
            });
        }

        const onDragEnd = (ev) => {
            const el = ev.target.closest('li');
            el.classList.remove('selected');
            this.setState({
                dragElement: ""
            });
        }

        return (
            <div className="todo-list">
                <ul
                    className="todo-list__list"
                    id="list"
                    ref={this.taskList}
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                >
                    {elements}
                </ul>
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

