import {data} from './data'

function loadPage() {
  //all of the clickevents that we need, like all of the buttons on the controls, should be a function
  loadEvents();
  loadProject('Inbox');
}

function loadEvents(){
  const addProjectBtn = document.querySelector('#add-project');
  const projectNameInput = document.querySelector('.project-name-input');
  const permanentTabs = document.querySelector('#permanent-categories');
  console.log(permanentTabs)
  addProjectBtn.addEventListener('click', (e) => {
    projectNameInput.classList.toggle('hidden');
  });

  projectNameInput.parentElement.addEventListener('submit', (e) => {
    data.newProject(projectNameInput.value);
    createProjectTab(projectNameInput.value);
    loadProject(projectNameInput.value);
    clearInput(projectNameInput);

    projectNameInput.classList.toggle('hidden');
    // console.log(data.projects)
  })

  const permanentTabsArray = Array.from(permanentTabs.children);

  console.log(permanentTabsArray[0].textContent)
  permanentTabsArray.forEach(btn => {
    btn.addEventListener('click', (e) => {
      loadProject(e.target.textContent)
    })
    console.log('hi')
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
  const newTaskBtn = document.createElement('button');
  
  project.classList.add('project');
  tasksContainer.classList.add('tasks-container');

  title.textContent = name;
  newTaskBtn.textContent = "Add Task";

  //loadTasks(taskContainer);

  project.append(newTaskBtn, title, tasksContainer);
  return project
}

function loadTasks(container, projectName) {

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