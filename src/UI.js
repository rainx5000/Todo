import {data} from './data'

function loadPage() {
  //all of the clickevents that we need, like all of the buttons on the controls, should be a function
  loadEvents();
  loadProject('Inbox');
  updateForm();
}

function loadEvents(){
  const addProjectBtn = document.querySelector('#add-project');
  const projectNameInput = document.querySelector('.project-name-input');
  const taskForm = document.querySelector('#new-task-form');
  applyTabClickEvents()
  addProjectBtn.addEventListener('click', (e) => {
    toggleDisplay(projectNameInput)
  });

  projectNameInput.parentElement.addEventListener('submit', (e) => {
    e.preventDefault();
    data.newProject(projectNameInput.value);
    createProjectTab(projectNameInput.value);
    loadProject(projectNameInput.value);
    clearInput(projectNameInput);
    toggleDisplay(projectNameInput)
    updateForm();
  })



  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = document.querySelector('.title');
    const taskPriority = document.querySelector('#priority-select');
    const taskProject = document.querySelector('#project-select');
    data.newTask(taskTitle.value, taskPriority.value, taskProject.value);
    loadProject(taskProject.value);
    toggleDisplay(taskForm);

    clearInput(taskTitle);
    taskPriority.value = 'Low';
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

// function createProjectTab(projectName) {
//   const tabContainer = document.querySelector('#projects-tab-container')
//   const tab = document.createElement('button');
//   tab.addEventListener('click', (e) => loadProject(e.target.textContent))
//   tab.textContent = projectName;
//   tabContainer.append(tab);
//   console.log(data.getProjects())
//   //add the option to delete this tab, also it should be a div rather than a button
// }

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

function toggleDisplay(element) {
  element.classList.toggle('hidden');
}

function getAllTabs() {
  const permanentTabs = document.querySelector('#permanent-categories');
  const projectTabs = document.querySelector('#projects-tab-container');
  const tabsArray = Array.from(permanentTabs.children).concat(Array.from(projectTabs.children));
  return tabsArray;
}

function applyTabClickEvents() {
  const eventHandler = (e) => {
      loadProject(e.target.textContent)
  }
  console.log(getAllTabs())
  getAllTabs().forEach(btn => btn.removeEventListener('click', eventHandler))
  getAllTabs().forEach(btn => btn.addEventListener('click', eventHandler))
}

// let eventHandler = (e) => {
//   loadProject(e.target.textContent)
// }
// applyTabClickEvents(eventHandler)

export { loadPage }