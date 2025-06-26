const taskDiv = document.querySelector('.task')
const timerDiv = document.querySelector('.timer')
const quoteDiv = document.querySelector('.quote')
const taskForm = document.querySelector('.task__form')
const taskList = document.getElementById('task-list')
const errorDisplay = document.getElementById('task-error')

document.getElementById('nav-task').addEventListener('click', toggleTask)
document.addEventListener('click', (e) => {
    if (
        !taskDiv.contains(e.target) && 
        !e.target.closest('.task__btns') &&
        !e.target.closest('#nav-task')
    ) {
        closeTask();
    }
})

function toggleTask() {
    if (window.matchMedia('(max-width: 700px)').matches) {
        taskDiv.classList.toggle('task--modal-active')
        taskDiv.classList.remove('task--side-active')
        timerDiv.classList.remove('shift-left')
        quoteDiv.classList.remove('shift-left')
    } else {
        taskDiv.classList.remove('task--modal-active')
        taskDiv.classList.toggle('task--side-active')
        timerDiv.classList.toggle('shift-left')
        quoteDiv.classList.toggle('shift-left')
    }
}

function closeTask() {
    taskDiv.classList.remove('task--modal-active', 'task--side-active');
    timerDiv.classList.remove('shift-left');
    quoteDiv.classList.remove('shift-left');
}

taskForm.addEventListener('submit', (e) => addNewTask(e))

function addNewTask(e) {
    e.preventDefault()
    const taskInput = document.getElementById('task-input')
    
    if (taskInput.value) {
        const taskItem = document.createElement('li')
        const taskText = document.createElement('p')
        const taskItemsBtnsContainer = document.createElement('div')
        // const taskEditBtn = document.createElement('button')
        const taskDeleteBtn = document.createElement('button')
        
        taskItem.classList.add('task__item')
        taskText.textContent = taskInput.value.trim()
        taskText.classList.add('task__text')
        // taskEditBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        // taskEditBtn.classList.add('task__btns', 'task__item-btns', 'task__edit-btn')
        taskDeleteBtn.innerHTML = '<i class="fa-solid fa-x"></i>'
        taskDeleteBtn.classList.add('task__btns', 'task__item-btns', 'task__delete-btn')
        taskItemsBtnsContainer.classList.add('task__item-btns-container')
        // taskItemsBtnsContainer.appendChild(taskEditBtn)
        taskItemsBtnsContainer.appendChild(taskDeleteBtn)
        taskItem.appendChild(taskText)
        taskItem.appendChild(taskItemsBtnsContainer)
        taskList.appendChild(taskItem)
    
        taskInput.value = ''
        errorDisplay.textContent = '';
    } else {
        errorDisplay.textContent = "The task can't be empty!";
    }
}

taskList.addEventListener('click', (e) => handleTaskClick(e))

function handleTaskClick(e) {
    if (e.target.closest('.task__edit-btn')) {
        editTask(e.target)
    } else if (e.target.closest('.task__delete-btn')) {
        deleteTask(e.target)
    } else if (e.target.classList.contains('task__text')) {
        toggleTaskState(e.target)
    }
}

function deleteTask(taskElement) {
    taskElement.closest('.task__item').remove()
}

function editTask(taskElement) {
    
}

function toggleTaskState(taskElement) {
    taskElement.classList.toggle('task__text--strikethrough')
}
