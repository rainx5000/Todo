import {data} from './data'

function loadPage() {
  //all of the clickevents that we need, like all of the buttons on the controls, should be a function
  loadEvents();
  loadProject('Inbox');
  updateForm();
}

function loadEvents(){
  loadProjectTabClickEvents();
  loadAddProjectBtnEvent();
  loadNewProjectSubmitEvent();
  loadTaskFormSubmitEvent();

}

const taskDisplayController = (() => {
  const newForm = document.querySelector('#new-task-form');
  const formTitle = document.querySelector('.title');
  const formPriority = document.querySelector('#priority-select');
  const formProject = document.querySelector('#project-select');
  const formDescription = document.querySelector('.description-input');
  const formDate = document.querySelector('#date');
  const formBtn = document.querySelector('.submit-task-btn');

  const taskCheckbox = (task) => task.querySelector('.task-checkbox');
  const taskTitle = (task) => task.querySelector('.task-title');
  const taskDueDate = (task) => task.querySelector('.task-dueDate');
  const taskEditBtn = (task) => task.querySelector('.task-edit-btn');
  const taskRemoveBtn = (task) => task.querySelector('.task-remove-btn');
  return {newForm, formTitle, formPriority, formProject, formDescription, formDate, formBtn, taskCheckbox, taskTitle, taskDueDate, taskEditBtn, taskRemoveBtn};
})()



function loadTaskFormEvents(task) {

  taskDisplayController.taskEditBtn(task).addEventListener('click', editTaskHandler);
}

function editTaskHandler(e) {
  console.log(e.target)
  const editForm = taskDisplayController.newForm.cloneNode(true);
  const body = document.querySelector('body');

  editForm.querySelector('h2').textContent = 'Edit';
  editForm.querySelector('button').textContent = 'Save';


  body.append(editForm);
  editForm.classList.add('edit-form');

  toggleDisplay(editForm);
  toggleDisabled(document.querySelector('#content'));
} //we will make it so when the edit/new forms are clicked, nothing happens when you click outside of that form/
  //the edit form is going to scan the values from data, where we will find the tasks it derived from, and apply it to the screen. 
  //Anything we change, tasks from data will also be changed when we submit/or click save//
  //once we clicked submit, we will remove the edit task form from existance.
  //select content id, and disable pointer-events

function loadTaskFormSubmitEvent() {
  const taskForm = document.querySelector('#new-task-form');

  taskForm.addEventListener('submit', (e) => { //create a function that only does this
    e.preventDefault();
    const task = taskDisplayController;

    data.newTask(task.formTitle.value, task.formPriority.value, task.formProject.value, task.formDescription.value, task.formDate.value);
    loadProject(task.formProject.value);
    toggleDisplay(taskForm);
    resetForm();
    toggleDisabled(document.querySelector('#content'));
  }) 
}



function loadAddProjectBtnEvent() {
  const projectNameInput = document.querySelector('.project-name-input');
  const addProjectBtn = document.querySelector('#add-project');
  addProjectBtn.addEventListener('click', (e) => { //create a function that only does this
    toggleDisplay(projectNameInput)
  });
}

function loadNewProjectSubmitEvent() {
  const projectNameInput = document.querySelector('.project-name-input');
  projectNameInput.parentElement.addEventListener('submit', (e) => { //create a function that only does this
    e.preventDefault();
    data.newProject(projectNameInput.value);
    createProjectTab(projectNameInput.value);
    loadProject(projectNameInput.value);
    clearInput(projectNameInput);
    toggleDisplay(projectNameInput)
    updateForm();
  })
}

function createProjectTab(projectName) {
  const tabsContainer = document.querySelector('#projects-tab-container');
  const tabContainer = document.createElement('div');
  const projectBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  removeBtn.innerHTML = '&#215;';
  projectBtn.addEventListener('click', (e) => loadProject(e.target.textContent))
  projectBtn.textContent = projectName;
  tabsContainer.append(tabContainer);
  tabContainer.append(projectBtn, removeBtn);
  removeBtn.classList.add('remove-project-btn');

  //add the option to delete this tab, also it should be a div rather than a button
}

function loadProject(projectName) {
  const projectContainer = document.querySelector("#project-container");
  deleteAllChildren(projectContainer);

  projectContainer.append(createProject(projectName));
}

function createProject(name) {
  const project = document.createElement("div");
  const title = document.createElement("h2");
  const tasksContainer = document.createElement("div");
  const newTaskBtn = document.createElement('button');
  
  project.classList.add('project');
  tasksContainer.classList.add('tasks-container');

  title.textContent = name;
  newTaskBtn.textContent = "Add Task";



  if (data.getProjectByName(name).isnonProject()) {
    project.append(title, tasksContainer);
  } else {
    project.append(newTaskBtn, title, tasksContainer);
  }
  loadTasks(tasksContainer, name);

  newTaskBtn.addEventListener('click', (e) => {
    toggleDisplay(document.querySelector('#new-task-form'));
    toggleDisabled(document.querySelector('#content'));
  })

  return project
}

function loadTasks(projectContainer, projectName) {
  const tasksArray = data.getProjectByName(projectName).filterByName(projectName);
  tasksArray.forEach(task => {
    const domTask = createTask(task.getTitle(), task.getPriority());
    projectContainer.append(domTask);
    loadTaskFormEvents(domTask);
  })

}

function createTask(taskTitle, taskPriority) {
  const task = document.createElement('div');
  const checkboxContainer = document.createElement('div');
  const checkbox = document.createElement('input');
  const titleContainer = document.createElement('div');
  const title = document.createElement('p');
  const dueDateContainer = document.createElement('div');
  const dueDate = document.createElement('p');
  const editBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  checkbox.type = 'checkbox';
  dueDate.textContent = '10/05/21';
  title.textContent = taskTitle;
  editBtn.innerHTML = '&#x2699;';
  removeBtn.innerHTML = '&#215;';

  checkboxContainer.append(checkbox);
  titleContainer.append(title);
  dueDateContainer.append(dueDate);
  task.append(checkboxContainer, titleContainer, dueDateContainer, editBtn, removeBtn);

  checkboxContainer.classList.add('task-checkbox-container');
  checkbox.classList.add('task-checkbox');
  titleContainer.classList.add('task-title-container');
  title.classList.add('task-title');
  dueDateContainer.classList.add('task-due-date-container');
  dueDate.classList.add('task-dueDate');
  editBtn.classList.add('task-edit-btn');
  removeBtn.classList.add('task-remove-btn');

  return task
}

function loadProjectTabClickEvents() {
  const eventHandler = (e) => {
      loadProject(e.target.textContent)
  }
  getAllTabs().forEach(btn => btn.addEventListener('click', eventHandler))
}


//tools

function resetForm() {
  clearInput(taskDisplayController.formTitle);
  clearInput(taskDisplayController.formDescription);
  clearInput(taskDisplayController.formDate);
  taskDisplayController.formPriority.value = 'Low';
}

function updateForm() {
  const projectSelect = document.querySelector('#project-select');
  const projectList = data.getProjects().map(project => project.name);
  const optionList = Array.from(projectSelect.children).map(option => option.text);

  projectList.forEach(name => {
    console.log(name, 'This Week')
    if (name === 'Today') return ;
    if (name === 'This Week') return;
    if (optionList.includes(name)) return;

    const option = document.createElement('option');
    option.text = name;
    projectSelect.appendChild(option);
  })
}

function getAllTabs() {
  const permanentTabs = document.querySelector('#permanent-categories');
  const projectTabs = document.querySelector('#projects-tab-container');
  const tabsArray = Array.from(permanentTabs.children).concat(Array.from(projectTabs.children));
  return tabsArray;
}

function deleteAllChildren(container) {
  while (container.children.length !== 0) {
    container.firstChild.remove();
  }
}

function toggleDisplay(element) {
  element.classList.toggle('hidden');
}
function toggleDisabled(element) {
  element.classList.toggle('disabled');
}

function clearInput(inputs) {
  inputs.value = '';
}

export { loadPage }