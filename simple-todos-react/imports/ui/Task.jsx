import React from "react";
import {TasksCollection} from "../api/TasksCollection.js";

export const Task = ({task, onCheckboxClick, onDeleteClick}) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={!!task.isChecked}
                onClick={() => onCheckboxClick(task)}
                readOnly
            />
            <span>{task.text}</span>
            <button onClick={ () => onDeleteClick(task) }>&times;</button>
        </li>
    );
}