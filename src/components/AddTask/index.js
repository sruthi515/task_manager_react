import React from 'react';
import {
    addToDoTask,
    updateInputDesc,
    updateInputTime,
    updateInputDate,
    updateInputTitle,
    tick
} from '../../actions';
import {
    connect
} from 'react-redux'
import './AddTask.css';
import history from '../../history.js';

let myAddTask = (props) => {

    let interval = null

    if (!props.isTimerOn){
        interval = setInterval(() => {
            props.dispatch(tick());
        }, 1000);
    }
    let description = props.currentTaskDescription
    let title = props.currentTaskTitle
    let scheduledTime = new Date(props.currentTaskDate + 'T' + props.currentTaskTime + ':00Z').getTime() - ((5 * 3600 + 30 * 60)) * 1000;
    props.dispatch(addToDoTask(description, title, scheduledTime, interval))
}

let updateCurrentInputTitle = (props) => (e) => {
    let title = e.target.value
    console.log("title: ", title);
    props.dispatch(updateInputTitle(title))
    console.log("props.title: ", props.title);
}

let updateCurrentTaskDesc = (props) => (e) => {
    let description = e.target.value
    props.dispatch(updateInputDesc(description))
}

let updateCurrentTaskDate = (props) => (e) => {
    let scheduledDate = e.target.value
    props.dispatch(updateInputDate(scheduledDate))
}

let updateCurrentTaskTime = (props) => (e) => {
    let scheduledTime = e.target.value
    props.dispatch(updateInputTime(scheduledTime)) 
}


const AddTask = (props) => {

    return (
        <div>
            < div className = "task_container" >
                <p>Add Task</p>
                <form>
                    <input type="text" onChange={updateCurrentInputTitle(props)} value={props.currentTaskTitle} placeholder="Title" required />
                    <input type="text" onChange={updateCurrentTaskDesc(props)} value={props.currentTaskDescription} placeholder="Description" required />
                    <input type="date" data-date-inline-picker="true" id="myDate" onChange={updateCurrentTaskDate(props)} required />
                    <input type="time" name="time" placeholder="hrs:mins" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" class="inputs time" onChange={updateCurrentTaskTime(props)} required />
                    < br />
                    <button className='addTask' name="reset_form" onClick={() => myAddTask(props)}>Submit</button>
                    < br />
                    <button className='addTask' onClick={() => { history.push('/')}} > Back To Tasks </button >
                </form>
            </div>
        </div>        
    )
}

function mapStateToProps(state) {
    return {
        currentTaskDescription: state.todos.currentTaskDescription,
        currentTaskTitle: state.todos.currentTaskTitle,
        currentTaskTime: state.todos.currentTaskTime,
        currentTaskDate: state.todos.currentTaskDate,
        isTimerOn: state.todos.isTimerOn
    }
}

export default connect(mapStateToProps)(AddTask);