export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const UPDATE_INPUT_TASK_DESC = 'UPDATE_INPUT_TASK_DESC'
export const UPDATE_INPUT_TASK_TIME = 'UPDATE_INPUT_TASK_TIME'
export const UPDATE_INPUT_TASK_DATE = 'UPDATE_INPUT_TASK_DATE'
export const UPDATE_INPUT_TASK_TITLE = 'UPDATE_INPUT_TASK_TITLE'
export const TICK = 'TICK'


export function addToDoTask(description, title, scheduledTime, interval) {
    console.log(description, title, scheduledTime, interval);
    return {
        type: ADD_TASK,
        title: title,
        description: description,
        scheduledTime: scheduledTime,
        startedTime: Date.now(),
        interval: interval
    };
}

export function updateTask(taskId, description, title, scheduledTime) {
    return {
        type: UPDATE_TASK,
        taskId: taskId,
        title: title,
        description: description,
        scheduledTime: scheduledTime
    };
}

export function deleteToDo(taskId) {
    return {
        type: DELETE_TASK,
        taskId: taskId
    };
}

export function updateInputDesc(description) {
    return {
        type: UPDATE_INPUT_TASK_DESC,
        currentTaskDescription: description
    };
}

export function updateInputDate(date) {
    return {
        type: UPDATE_INPUT_TASK_DATE,
        currentTaskDate: date
    };
}

export function updateInputTime(scheduledTime) {
    return {
        type: UPDATE_INPUT_TASK_TIME,
        currentTaskTime: scheduledTime
    };
}
export function updateInputTitle(title) {
    return {
        type: UPDATE_INPUT_TASK_TITLE,
        currentTaskTitle: title
    };
}

export function tick() {
    return {
        type: TICK
    };
}