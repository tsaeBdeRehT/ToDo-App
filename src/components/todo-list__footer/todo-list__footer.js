import React from "react";
import TodoListFilter from "../todo-list__filter/todo-list__filter";
import './todo-list__footer.css'

const TodoListFooter = ({toDo = 0, filter, onFilterChange, clearCompleted}) => {
    return (
        <div className="todo-list__footer">
            <span>{toDo} items left</span>
            <TodoListFilter
                filter = {filter}
                onFilterChange = { onFilterChange }
            />
            <button
                className="button"
                onClick={clearCompleted}
            >
                Clear completed
            </button>
        </div>
    );
};

export default TodoListFooter;