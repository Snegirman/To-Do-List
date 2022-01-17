const addTaskBtn = document.getElementById('add-task-button'),
      deskTaskInput = document.getElementById('input-task'),
      toDoList = document.getElementById('task-list');
let deleteTaskBtn = [],
    tasks,
    todoTaskElements = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task (description) {
    this.description = description;
    this.completed = false;
}

function createTemplate (task, index) {
    return `
     <li>
        <label>
       <input onclick="checkedAdd(${index})" type="checkbox" ${task.completed ? 'checked' : ''} class="check-btn">
           <span class="custom-checkbox"></span>
           </label>
           <span class="task ${task.completed ? 'done' : ''}">${task.description}</span>
       <button onclick="deleteAdd(${index})" class="delete-btn">Delete</button>
     </li>
    `;
}

function deleteAdd (index) {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

function checkedAdd (index) {
    tasks[index].completed = !tasks[index].completed;
    todoTaskElements[index].classList.toggle('done');
    updateLocal();
}

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const fillHtmlList = () => {
    toDoList.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            toDoList.innerHTML += createTemplate(item, index);
        });
        todoTaskElements = document.querySelectorAll('.task');
        deleteTaskBtn = document.querySelectorAll('.delete-btn');
    }
};

fillHtmlList();


addTaskBtn.addEventListener('click', () => {
    if (deskTaskInput.value != false) {
        tasks.push(new Task(deskTaskInput.value));
        updateLocal();
        fillHtmlList();
    }
    deskTaskInput.value = "";
});