function loadPage() {
  //all of the clickevents that we need, like all of the buttons on the controls, should be a function
  loadEvents();
}

function loadEvents(){
  const addProjectBtn = document.querySelector('#add-project');
  addProjectBtn.addEventListener('click', (e) => {
    document.querySelector('.project-name-input').classList.toggle('hidden');
  }) 
}

export { loadPage }