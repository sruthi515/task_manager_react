import React from 'react';
import * as _ from 'underscore';
import {
    connect
} from 'react-redux'
import {
    updateTask,
    updateInputDesc,
    updateInputTime,
    updateInputDate,
    updateInputTitle
} from '../../actions';
import history from '../../history.js';
import  './updateTask.css';

let updateCurrentTask = (taskId,props) => {
    let description = props.currentTaskDescription
    let title = props.currentTaskTitle
    let scheduledTime = new Date(props.currentTaskDate + 'T' + props.currentTaskTime + ':00Z').getTime() - ((5 * 3600 + 30 * 60)) * 1000;
    props.dispatch(updateTask(taskId, description, title, scheduledTime))
}

let updateCurrentInputTitle = (props) => (e) => {
    let title = e.target.value
    props.dispatch(updateInputTitle(title))
}

let updateCurrentInputDesc = (props) => (e) => {
    let description = e.target.value
    props.dispatch(updateInputDesc(description))
}

let updateCurrentInputDate = (props) => (e) => {
    let scheduledDate = e.target.value
    props.dispatch(updateInputDate(scheduledDate))
}

let updateCurrentInputTime = (props) => (e) => {
    let scheduledTime = e.target.value
    props.dispatch(updateInputTime(scheduledTime))
}

const UpdateTask = (props) => {
    
    let taskId = parseInt(window.location.pathname.split('/')[window.location.pathname.split('/').length - 1])
    let task =  props.tasks.find(task => task.taskId == taskId)
    return (
        <div>            
            < div className = "task_container" >
                <p>Edit Task</p>
                <form >
                    <input type="text" onChange={updateCurrentInputTitle(props)} value={props.currentTaskTitle || task.title} placeholder="Title" required />
                    <input type="text" onChange={updateCurrentInputDesc(props)} value={props.currentTaskDescription || task.description} placeholder="Description" required />
                    <input type="date" data-date-inline-picker="true" id="myDate" onChange={updateCurrentInputDate(props)} value='22/12/2018' value={props.currentTaskDate} required />
                    <input type="time" name="time" placeholder="hrs:mins" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" className="inputs time" value={props.currentTaskTime} onChange={updateCurrentInputTime(props)} required />
                    < br />                    
                    <button className='updateTaskButton' name="reset_form" onClick={() => updateCurrentTask(task.taskId,props)}>Submit</button>
                    < br />
                    <button className='updateTaskButton' onClick={() => { history.push('/')}}> Update Task </button >
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
        tasks: state.todos.tasks
    }
}

export default connect(mapStateToProps)(UpdateTask);