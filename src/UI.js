import {data} from './data'

function loadPage() {
  //all of the clickevents that we need, like all of the buttons on the controls, should be a function
  loadEvents();
}

function loadEvents(){
  const addProjectBtn = document.querySelector('#add-project');
  const projectNameInput = document.querySelector('.project-name-input');
  addProjectBtn.addEventListener('click', (e) => {
    projectNameInput.classList.toggle('hidden');
  });
  projectNameInput.parentElement.addEventListener('submit', (e) => {
    data.newProject(projectNameInput.value);
    clearInput(projectNameInput);
    projectNameInput.classList.toggle('hidden')
    console.log(data.projects);

  })

  
}

function clearInput(inputs) {
  inputs.value = '';
}

export { loadPage }