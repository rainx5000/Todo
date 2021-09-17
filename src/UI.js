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
    taskPriority.value = 'low';
  }) 
  
}

function createProjectTab(projectName) {
  const tabContainer = document.querySelector('#projects-tab-container')
  const tab = document.createElement('button');
  tab.addEventListener('click', (e) => loadProject(e.target.textContent))
  tab.textContent = projectName;
  tabContainer.prepend(tab);
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
  const checkbox = document.createElement('input');
  const title = document.createElement('p');
  const dueDate = document.createElement('input');
  const editBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  checkbox.type = 'checkbox';
  dueDate.type = 'date';
  title.textContent = taskTitle;
  editBtn.textContent = 'EDIT';
  removeBtn.textContent = 'DELETE';
  task.append(checkbox, title, dueDate, editBtn, removeBtn);
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
  getAllTabs().forEach(btn => btn.removeEventListener('click', eventHandler))
  getAllTabs().forEach(btn => btn.addEventListener('click', eventHandler))
}

// let eventHandler = (e) => {
//   loadProject(e.target.textContent)
// }
// applyTabClickEvents(eventHandler)

export { loadPage }