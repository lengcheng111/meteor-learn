import {Meteor} from 'meteor/meteor';
import React, {useState, Fragment} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {Task} from './Task';
import {TaskForm} from './TaskForm';
import {LoginForm} from './LoginForm';
import {TasksCollection} from "../api/TasksCollection.js";
import {ToogleTask} from "./ToogleTask.jsx";


export const App = () => {
    const [hideCompleted, setHideCompleted] = useState(false);

    const user = useTracker(() => Meteor.user());

    const hideCompletedFilter = {isChecked: {$ne: true}};

    const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
        sort: {createdAt: -1},
    }).fetch());

    const pendingTasksCount = useTracker(() => {
        const count = TasksCollection.find(hideCompletedFilter).count();
        return count
    });
    const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`;

    const toggleChecked = ({_id, isChecked}) => {
        TasksCollection.update(_id, {
            $set: {
                isChecked: !isChecked
            }
        })
    };
    const deleteTask = ({_id}) => TasksCollection.remove(_id);

    return (
        <div className="main">
        {user ? (
            <Fragment>
                <TaskForm/>

                <ToogleTask hideCompleted={hideCompleted} setHideCompleted={setHideCompleted}/>

                <ul className="tasks">
                    {tasks.map(task => (
                        <Task
                            key={task._id}
                            task={task}
                            onCheckboxClick={toggleChecked}
                            onDeleteClick={deleteTask}
                        />
                    ))}
                </ul>
            </Fragment>
        ) : (
            <LoginForm />
        )}
    </div>
    );
};
