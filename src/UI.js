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
  const title = document.querySelector('.title');
  const priority = document.querySelector('#priority-select');
  const project = document.querySelector('#project-select');
  const description = document.querySelector('.description-input');
  const date = document.querySelector('#date');
  const btn = document.querySelector('.submit-task-btn');
  return {title, priority, project, description, date, btn};
})()

function loadTaskFormSubmitEvent() {
  const taskForm = document.querySelector('#new-task-form');

  taskForm.addEventListener('submit', (e) => { //create a function that only does this
    e.preventDefault();
    const task = taskDisplayController;

    data.newTask(task.title.value, task.priority.value, task.project.value, task.description.value, task.date.value);
    loadProject(task.project.value);
    toggleDisplay(taskForm);
    resetForm();
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
  console.log(data.getProjects())
  //add the option to delete this tab, also it should be a div rather than a button
}

function loadProject(projectName) {
  const projectContainer = document.querySelector("#project-container");
  clearContainer(projectContainer);

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
  newTaskBtn.addEventListener('click', (e) => toggleDisplay(document.querySelector('#new-task-form')));
  return project
}

function loadTasks(container, projectName) {
  const tasksArray = data.getProjectByName(projectName).filterByName(projectName);
  console.log(tasksArray, projectName);
  tasksArray.forEach(task => {
    container.append(createTask(task.title, task.priority));
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
  const dropDown = document.createElement('div');

  checkbox.type = 'checkbox';
  dueDate.textContent = '10/05/21';
  title.textContent = taskTitle;
  editBtn.innerHTML = '&#x2699;';
  removeBtn.innerHTML = '&#215;';

  checkboxContainer.append(checkbox);
  titleContainer.append(title);
  dueDateContainer.append(dueDate);
  task.append(checkboxContainer, titleContainer, dueDateContainer, editBtn, removeBtn, dropDown);

  checkboxContainer.classList.add('task-checkbox-container');
  titleContainer.classList.add('task-title-container');
  dueDateContainer.classList.add('task-due-date-container');
  editBtn.classList.add('task-edit-btn');
  removeBtn.classList.add('task-remove-btn');
  dropDown.classList.add('drop-down');
  return task
}




function clearContainer(container) {
  while (container.children.length !== 0) {
    container.firstChild.remove();
  }

}

function clearInput(inputs) {
  inputs.value = '';
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




function loadProjectTabClickEvents() {
  const eventHandler = (e) => {
      loadProject(e.target.textContent)
  }
  getAllTabs().forEach(btn => btn.addEventListener('click', eventHandler))
}

//tools

function resetForm() {
  clearInput(taskDisplayController.title);
  clearInput(taskDisplayController.description);
  clearInput(taskDisplayController.date);
  taskDisplayController.priority.value = 'Low';
}

function getAllTabs() {
  const permanentTabs = document.querySelector('#permanent-categories');
  const projectTabs = document.querySelector('#projects-tab-container');
  const tabsArray = Array.from(permanentTabs.children).concat(Array.from(projectTabs.children));
  return tabsArray;
}

function toggleDisplay(element) {
  element.classList.toggle('hidden');
}

export { loadPage }