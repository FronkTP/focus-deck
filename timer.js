const timerDisplay = document.getElementById('timer-display')
const timerStartBtn = document.getElementById('timer-start-btn')
const timerPauseBtn = document.getElementById('timer-pause-btn')
let intervalId = null
let timerRunning = false
const modes = {
    pomodoroTime: 25 * 60,
    shortBreakTime: 5 * 60,
    longBreakTime: 15 * 60,
};
let currentTime = modes.pomodoroTime
let currentMode = modes.pomodoroTime

document.getElementById('pomodoro-btn').addEventListener('click', () => setTimer('pomodoroTime'))
document.getElementById('short-break-btn').addEventListener('click', () => setTimer('shortBreakTime'))
document.getElementById('long-break-btn').addEventListener('click', () => setTimer('longBreakTime'))

function setTimer(mode) {
    resetTimer()
    currentTime = modes[mode]
    currentMode = currentTime
    toggleStartPauseBtns(true)
    displayTime()
}

document.getElementById('timer-controls').addEventListener('click', (e) => {
    const buttonId = e.target.closest('button').id
    if (buttonId === 'timer-start-btn') startTimer();
    else if (buttonId === 'timer-pause-btn') pauseTimer();
    else if (buttonId === 'timer-reset-btn') resetToMode();
})

function startTimer() {
    if (intervalId != null) return
    timerRunning = true
    intervalId = setInterval(updateTimer, 1000)
    toggleStartPauseBtns(false)
}

function updateTimer() {
    if (currentTime <= 0) {
        resetTimer()
        displayTime()
        return
    }
    displayTime()
    currentTime -= 1
}

function resetTimer() {
    clearInterval(intervalId)
    intervalId = null
    timerRunning = false
}

function pauseTimer() {
    resetTimer()
    toggleStartPauseBtns(true)
    displayTime()
}

function resetToMode() {
    resetTimer()
    toggleStartPauseBtns(true)
    currentTime = currentMode
    displayTime()
}

function toggleStartPauseBtns(showStart) {
    timerStartBtn.style.display = showStart ? 'inline' : 'none';
    timerPauseBtn.style.display = showStart ? 'none' : 'inline';
}

function displayTime() {
    const min = Math.floor(currentTime / 60)
    const sec = String(currentTime % 60).padStart(2, '0')
    timerDisplay.textContent = `${min}:${sec}`
}
