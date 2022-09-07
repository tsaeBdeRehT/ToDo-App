import React from "react";

import './todo-list__item.css'
import check from '../../images/icon-check.svg';
import remove from '../../images/icon-cross.svg';

const ToDoListItem = ({ label, onDeleted, onToggleDone, done, provided }) => {

    let classNames = "item";

    if (done) {
        classNames += " done"
    }

    return (
        <div className="todo-list__item"
             {... provided.draggableProps}
             {... provided.dragHandleProps}
             ref={provided.innerRef}
        >
            <div className={classNames}>
                <div className="item-check"
                     onClick={onToggleDone}

                >
                    <img src={check} className="check-icon" />
                </div>
                <span className="item-label" >{label}</span>
            </div>
            <button type="button"
                    className="item-remove"
                    onClick={onDeleted}>
                <img src={remove}/>
            </button>
        </div>
    );
}

export default ToDoListItem;



