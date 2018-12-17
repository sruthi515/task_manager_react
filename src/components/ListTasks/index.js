import React from 'react';
import history from '../../history.js';
import {deleteToDo} from '../../actions';
import {
    connect
} from 'react-redux'
import Notification from 'react-web-notification';
import './ListTasks.css';

function myhandleDelete(taskId,props) {
    props.dispatch(deleteToDo(taskId))
}

const ListTasks = (props) => {

    return (
        <div >
            < div className = "outer_container" >
                <h3>Todo List</h3>
                <button  onClick={() => history.push('/add')}>Add Task</button>
                <div className="inner_container">
                    {props.tasks.length > 0 ?  <table className='tasks-table'>
                        <tr>
                            <th>TaskId</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created Time</th>
                            <th>Scheduled Time</th>                                                                                                     
                        </tr>
                        {
                            props.tasks.map(task => {
                                let startedTime = new Date(task.startedTime).toLocaleString()
                                let endTime = new Date(task.scheduledTime).toLocaleString()
                                return (
                                    <tr>
                                        <td>{task.taskId}</td>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{startedTime}</td>
                                        <td>{endTime}</td>
                                        <button style={{width: 80 }} onClick={()=> {history.push(`/update/${task.taskId}`)}} >Edit </button>
                                        <button  style={{width: 80 }} onClick={() => myhandleDelete(task.taskId,props)}>Delete</button>                                       
                                    </tr>
                                )
                            })
                        }                           

                    </table> : ''}
                </div>
            </div>   
            {
                props.expiredTasksInCurrentTick.map(expiredTask => < Notification timeout={10000} title={`Alert for Task:${expiredTask.title},Description:${expiredTask.description},Task-Id:${expiredTask.taskId}`} />)
            }                   
        </div>

    )
}

function mapStateToProps(state) {
    return {
        tasks: state.todos.tasks,
        expiredTasksInCurrentTick:  state.todos.expiredTasksInCurrentTick
    }
}

export default connect(mapStateToProps)(ListTasks);