class Task {
  taskData;
  taskDate;
  taskTime;

  constructor(taskData, taskDate, taskTime) {
    this.taskData = taskData;
    this.taskDate = taskDate;
    this.taskTime = taskTime;
  }
}

console.log('Neri-Lenchner, John-Bryce Board Project');

const taskListTotalData = JSON.parse(localStorage.getItem('taskList')) || [];
const taskListTotal = [];
let isNewData = false;
createTaskList();
renderNotes(false);

function createTaskList() {
  if (taskListTotalData.length) {
    taskListTotalData.forEach((task) => {
      taskListTotal.push(new Task(task.taskData, task.taskDate, task.taskTime));
    });
  }
}

function saveData() {
  localStorage.setItem('taskList', JSON.stringify(taskListTotal));
}

function addTask(event) {
  event.preventDefault();

  const form = event.target;
  const data = form.taskData.value.trim();
  const date = form.taskDate.value; 
  const time = form.taskTime.value;

  const selectedDate = new Date(date + 'T' + time + ':00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert('Please enter a valid future date.');
    return;
  }

  taskListTotal.push(new Task(data, date, time));
  saveData();
  renderNotes(true);
}

function resetForm() {
  const formTextErea = document.querySelector('#large-text-erea-element');
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    input.value = '';
  });
  formTextErea.value = '';
}

function renderNotes(bulIsTrue) {
  const notesMonitorElement = document.querySelector('#notes-monitor-element');
  notesMonitorElement.innerHTML = '';
  let lastNoteElement = null;

  taskListTotal.forEach((task, i) => {

    const note = document.createElement('div');
    note.className = 'note';
    const noteButton = document.createElement('button');
    noteButton.className = 'note-button'; 
    noteButton.innerHTML = '&times;';
    noteButton.addEventListener('click', () => {
    deleteNote(i);
    });
    const noteInfo = document.createElement('div');
    noteInfo.className = 'note-info';
    const text = document.createElement('div');
    text.innerText = task.taskData;
    text.className = 'text';
    const dateTimeContainer = document.createElement('div');
    dateTimeContainer.className = 'date-time-container';
    const date = document.createElement('div');
    date.textContent = task.taskDate.split('-').reverse().join('/');
    date.className = 'date';
    const time = document.createElement('div');
    time.className = 'time';
    time.textContent = task.taskTime;
    dateTimeContainer.append(date, time);
    noteInfo.append(text, dateTimeContainer);
    note.append(noteButton,noteInfo);
    notesMonitorElement.appendChild(note);
    lastNoteElement = note;
  });
  if (bulIsTrue) {
    if (lastNoteElement) {
      lastNoteElement.classList.add('last-note');
    }
  }
  notesMonitorElement.scrollTop = notesMonitorElement.scrollHeight;
}

function deleteNote(index) {
  taskListTotal.splice(index, 1);
  saveData();
  if (taskListTotal.length === 0) {
    localStorage.removeItem('taskList');
  }
  renderNotes(false);
}

