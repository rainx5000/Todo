import {data} from './data'

function loadPage() {
  //all of the clickevents that we need, like all of the buttons on the controls, should be a function
  loadEvents();
  loadProject('Inbox');
}

function loadEvents(){
  const addProjectBtn = document.querySelector('#add-project');
  const projectNameInput = document.querySelector('.project-name-input');
  addProjectBtn.addEventListener('click', (e) => {
    projectNameInput.classList.toggle('hidden');
  });
  projectNameInput.parentElement.addEventListener('submit', (e) => {
    data.newProject(projectNameInput.value);
    createProjectTab(projectNameInput.value);
    clearInput(projectNameInput);
    //loadProject(projectName.value);
    projectNameInput.classList.toggle('hidden');
    console.log(data.projects)
  })

  
}



function createProjectTab(projectName) {
  const tabContainer = document.querySelector('#projects-tab-container')
  const tab = document.createElement('button');
  tab.textContent = projectName;
  tabContainer.prepend(tab);
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

  project.classList.add('project');
  tasksContainer.classList.add('tasks-container');

  title.textContent = name;
  project.append(title, tasksContainer);
  return project
}




function clearContainer(container) {
  while (container.children.length !== 0) {
    container.firstChild.remove();
  }

}

function clearInput(inputs) {
  inputs.value = '';
}



export { loadPage }