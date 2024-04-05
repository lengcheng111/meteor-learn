import React from "react";

export const ToogleTask = ({hideCompleted, setHideCompleted}) => {

    return (
        <div className="filter">
            <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
            </button>
        </div>
    )
}