import {
    combineReducers
} from 'redux'
import {
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    UPDATE_INPUT_TASK_DESC,
    UPDATE_INPUT_TASK_TIME,
    UPDATE_INPUT_TASK_TITLE,
    TICK,
    UPDATE_INPUT_TASK_DATE
} from '../actions'
import * as _ from 'underscore';
import history from '../history.js';


let initialState = {
    isTimerOn: false,
    currentTaskDate: '',
    currentTaskTime: 0,
    currentTaskDescription: '',
    currentTaskTitle: '',
    tasks: [

    ],
    interval: '',
    expiredTasksInCurrentTick: []
}


function tick(state) {

    let timersLeftCount = 0
    let expiredTasksInCurrentTick = []
    state.tasks.map(function (task) {
        if (!task.completed && task.scheduledTime < Date.now()) {
            expiredTasksInCurrentTick.push({
                description: task.description,
                title: task.title,
                taskId: task.taskId
            })
        } else if (!task.completed) {
            ++timersLeftCount;
        }
    })
    let tasks = state.tasks
    state.expiredTasksInCurrentTick = expiredTasksInCurrentTick
    expiredTasksInCurrentTick.map(expiredTask => {
        tasks.map((task, index) => {
            if (task.taskId == expiredTask.taskId) {
                task.completed = true
                tasks[index] = task
            }
        })
    })

    if (timersLeftCount == 0) {
        console.log('stopping timer ========');
        state.isTimerOn = false
        clearInterval(state.interval);
    }
}


function todos(state = initialState, action) {
    var tasks = []
    switch (action.type) {
        case ADD_TASK:
            tasks = [...state.tasks]
            let newTask = {
                taskId: state.tasks.length + 1,
                description: action.description,
                title: action.title,
                scheduledTime: parseInt(action.scheduledTime),
                startedTime: action.startedTime,
                completed: false
            }
            tasks.push(newTask)
            history.push('/')
            return {
                ...state,
                tasks,
                isTimerOn: true,
                interval: action.interval ? action.interval : state.interval,
                expiredTasksInCurrentTick: [],
                currentTaskDate: '',
                currentTaskTime: '',
                currentTaskDescription: '',
                currentTaskTitle: ''
            }
        case UPDATE_TASK:
            tasks = []
            tasks = [...state.tasks]
            let indexToBeUpdated = _.findIndex(tasks, task => task.taskId == action.taskId)
            tasks[indexToBeUpdated].description = tasks[indexToBeUpdated].description || action.description
            tasks[indexToBeUpdated].title = tasks[indexToBeUpdated].title || action.title
            tasks[indexToBeUpdated].scheduledTime = tasks[indexToBeUpdated].scheduledTime || action.scheduledTime
            history.push('/')
            return {
                ...state,
                tasks
            }
        case DELETE_TASK:
            tasks = [...state.tasks]
            let indexToBeDeleted = _.findIndex(tasks, task => task.taskId == action.taskId)
            if (indexToBeDeleted > -1) {
                tasks.splice(indexToBeDeleted, 1);
            }
            return {
                ...state,
                tasks
            }
        case UPDATE_INPUT_TASK_DESC:
            return { ...state,
                currentTaskDescription: action.currentTaskDescription
            }
        case UPDATE_INPUT_TASK_DATE:
            return { ...state,
                currentTaskDate: action.currentTaskDate
            }
        case UPDATE_INPUT_TASK_TIME:
            return { ...state,
                currentTaskTime: action.currentTaskTime
            }
        case UPDATE_INPUT_TASK_TITLE:
            return {
                ...state,
                currentTaskTitle: action.currentTaskTitle
            }
        case TICK:
            let updatedState = Object.assign({}, state)
            tick(updatedState)
            return updatedState;
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos
})
export default todoApp