import {data} from './data'
import { compareAsc, format } from 'date-fns'
import Project from './project';

const taskController = (() => {
  const newForm = document.querySelector('#new-task-form');
  const formTitle = (form) => form.querySelector('.title');
  const formPriority = (form) => form.querySelector('#priority-select');
  const formProject = (form) => form.querySelector('#project-select');
  const formDescription = (form) => form.querySelector('.description-input');
  const formDate = (form) => form.querySelector('#date');
  const formBtn = (form) => form.querySelector('.submit-task-btn');

  const taskCheckbox = (task) => task.querySelector('.task-checkbox');
  const taskTitle = (task) => task.querySelector('.task-title');
  const taskDueDate = (task) => task.querySelector('.task-dueDate');
  const taskEditBtn = (task) => task.querySelector('.task-edit-btn');
  const taskRemoveBtn = (task) => task.querySelector('.task-remove-btn');

  function loadTasks(projectContainer, projectName) {
    let tasksArray = data.getProjectByName(projectName).filterByName(projectName);
    if (projectName === "Week" || projectName == "Today") {
      tasksArray = data.getProjectByName(projectName).filterByTime(projectName);
    }

    tasksArray.forEach(task => {
      const domTask = createTask(task.title, task.priority, task.dueDate, task.completed);
      projectContainer.append(domTask);
      loadTaskEvents(domTask);
    })
  }

  function createTask(taskTitle, taskPriority, taskDate, taskCompleted) {
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

    taskDate ? dueDate.textContent = formatDate() : dueDate.textContent = '';
    if (taskCompleted) {
      checkbox.checked = true;
      title.classList.add('completed');

    };
    
    dueDateContainer.style.backgroundColor = priorityColor(taskPriority);

    title.textContent = taskTitle;
    titleContainer.style.backgroundColor = priorityColor(taskPriority);

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

    function priorityColor(priority) {
      switch(priority) {
        case 'Moderate':
          return '#edcea1';
        case 'High':
          return '#fc9d9a'
        default:
          return '#c9f7b2'
      }
    }

    function formatDate() {
      const date = taskDate.split('-');
      const month = Number(date[1]) - 1;
      const day = Number(date[2]);
      const year = Number(date[0]);

      return format(new Date(year, month, day), 'MM-dd-yyyy');
    }

    return task
  }
  function loadTaskFormSubmitEvent() {
    const taskForm = document.querySelector('#new-task-form');
  
    taskForm.addEventListener('submit', (e) => { //create a function that only does this
      e.preventDefault();
      const task = taskController;
      const newForm = document.querySelector('#new-task-form');
      data.newTask(task.formTitle(newForm).value, task.formPriority(newForm).value, task.formProject(newForm).value,
                  task.formDescription(newForm).value, task.formDate(newForm).value);
      loadProject(task.formProject(newForm).value);
      setActiveProject(task.formProject(newForm));
      toggleDisplay(taskForm);
      _resetForm();
      toggleDisabled(document.querySelector('#content'));
    }) 
  }

  function _resetForm() {
    const newForm = document.querySelector('#new-task-form');
    clearInput(taskController.formTitle(newForm));
    clearInput(taskController.formDescription(newForm));
    clearInput(taskController.formDate(newForm));
    taskController.formPriority(newForm).value = 'Low';
  }

  function updateFormProjectList() {
    const projectSelect = document.querySelector('#project-select');
    const projectList = data.getProjects().map(project => project.name);
    const optionList = Array.from(projectSelect.children).map(option => option.text);
  
    projectList.forEach(name => {
      if (name === 'Today') return ;
      if (name === 'Week') return;
      if (optionList.includes(name)) return;
  
      const option = document.createElement('option');
      option.text = name;
      projectSelect.appendChild(option);
    })
        formProject(newForm).value = getActiveProject().textContent;
  }

  function getEditFormValues(task) {
    const form = document.querySelector('.edit-form');
    const taskData = data.getTaskByName(taskTitle(task).textContent);
    formTitle(form).value = taskData.title;
    formPriority(form).value = taskData.priority;
    formProject(form).value = taskData.project;
    formDescription(form).value = taskData.description
    formDate(form).value = taskData.dueDate;
  }

  function setEditFormValues(task) {
    const form = document.querySelector('.edit-form');
    const taskData = data.getTaskByName(taskTitle(task).textContent);
    taskData.title = formTitle(form).value;
    taskData.description = formDescription(form).value;
    taskData.priority = formPriority(form).value;
    taskData.project = formProject(form).value;
    taskData.dueDate = formDate(form).value;
    data.saveTaskToLocalStorage(data.getTasks())
  }

  function loadTaskEvents(task) {
    taskEditBtn(task).addEventListener('click', editTaskHandler);
    taskRemoveBtn(task).addEventListener('click', removeTaskHandler);
    taskCheckbox(task).addEventListener('click', toggleCompleteTask);
    function editTaskHandler(e) {
      e.target.blur(); //unfocus the edit btn, so enter key won't activate the edit btn again
      const editForm = newForm.cloneNode(true);
      formTitle(editForm).setAttribute('readonly', '');
      const body = document.querySelector('body');
    
      editForm.querySelector('h2').textContent = 'Edit';
      editForm.querySelector('button').textContent = 'Save';
    
      body.append(editForm);
      editForm.classList.add('edit-form');
      getEditFormValues(task);
      toggleDisplay(editForm);
      toggleDisabled(document.querySelector('#content'));

      editForm.addEventListener('submit', saveTaskHandler);

      function saveTaskHandler(e) {
        e.preventDefault();
        setEditFormValues(task);
        const taskName = formTitle(editForm).value

        editForm.remove();
        toggleDisabled(document.querySelector('#content'));
        const taskData = data.getTaskByName(taskName);
        loadProject(taskData.project);
      }
    } 

    function removeTaskHandler(e) {
      const taskData = data.getTaskByName(taskTitle(task).textContent);
      const projectName = taskData.project;
      data.removeTask(taskData);
      loadProject(projectName);
      data.saveTaskToLocalStorage(data.getTasks())
    }
    function toggleCompleteTask (e) {
      const taskData = data.getTaskByName(taskTitle(task).textContent);
      if (taskData.completed) {
        taskData.completed = false;
        taskTitle(task).classList.remove('completed');
      } else {
        taskData.completed = true;
        taskTitle(task).classList.add('completed');
      }
      data.saveTaskToLocalStorage(data.getTasks())
    }
  }
  return {newForm, formTitle, formPriority, formProject, formDescription, formDate, formBtn, taskCheckbox,
      taskTitle, taskDueDate, taskEditBtn, taskRemoveBtn, loadTasks, loadTaskFormSubmitEvent, updateFormProjectList};
})()


function loadPage() {
  loadFirstProjects();
  data.loadProjectsFromStorage()
  data.loadTasksFromStorage()
  loadEvents();
  renderProjectTabs(data.getProjects())
  loadProject('Inbox');
  setActiveProject(document.querySelector('.category-inbox'));
  taskController.updateFormProjectList();
}



function loadEvents(){
  loadProjectTabClickEvents();
  loadAddProjectBtnEvent();
  loadNewProjectSubmitEvent();
  taskController.loadTaskFormSubmitEvent();

}

function loadAddProjectBtnEvent() {
  const projectNameInput = document.querySelector('.project-name-input');
  const addProjectBtn = document.querySelector('#add-project');
  addProjectBtn.addEventListener('mouseup', (e) => { //create a function that only does this
    toggleDisplay(projectNameInput);
    projectNameInput.focus();
    function eventHandler(e) {
        if(e.target != document.querySelector("#add-project")) document.querySelector('.project-name-input').classList.add('hidden');
    }
    window.addEventListener('mousedown', eventHandler, {once: true})
  });
}

function loadNewProjectSubmitEvent() {
  const projectNameInput = document.querySelector('.project-name-input');
  const projectsContainer = document.querySelector('#projects-tab-container');
  projectNameInput.parentElement.addEventListener('submit', (e) => { //create a function that only does this
    e.preventDefault();
    data.newProject(projectNameInput.value);
    renderProjectTabs();
    loadProject(projectNameInput.value);
    console.log(projectsContainer.lastChild)
    setActiveProject(projectsContainer.lastChild.firstChild)
    clearInput(projectNameInput);
    toggleDisplay(projectNameInput)
    taskController.updateFormProjectList();
  })
}

function createProjectTab(projectName) {
  const tabsContainer = document.querySelector('#projects-tab-container');
  const tabContainer = document.createElement('div');
  const projectBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  removeBtn.innerHTML = '&#215;';
  projectBtn.addEventListener('click', (e) => {
    loadProject(e.target.textContent);
    setActiveProject(e.target);
  })

  

  projectBtn.textContent = projectName;
  tabsContainer.append(tabContainer);
  tabContainer.append(projectBtn, removeBtn);
  removeBtn.classList.add('remove-project-btn');

  removeBtn.addEventListener('click', (e) => {
    deleteProject(e);
  });
}

function loadProject(projectName) {
  const projectContainer = document.querySelector("#project-container");
  deleteAllChildren(projectContainer);
  projectContainer.append(createProject(projectName));

}

function deleteProject(e) {
  const projectTabContainer = e.target.parentElement;
  const projectData = data.getProjectByName(projectTabContainer.firstChild.textContent);
  data.removeProject(projectData);
  data.removeTasksByProjectName(projectData.name);
  renderProjectTabs();
  setActiveProject(document.querySelector('.category-inbox'));
  data.saveProjectToLocalStorage(data.getProjects());
  data.saveTaskToLocalStorage(data.getTasks());
}

function renderProjectTabs () {
  const domTabsArray = getAllTabs();
  const dataTabsNames = data.getProjects().map(tab => tab.getProjectName());
  const domTabsNames = domTabsArray.map(tab => tab.firstChild.textContent);

  dataTabsNames.forEach(tab => {
    if (domTabsNames.includes(tab)) return;
    createProjectTab(tab);
  })

  domTabsArray.forEach(tab => {
    if (dataTabsNames.includes(tab.firstChild.textContent)) return;
    if (tab.firstChild.textContent === getActiveProject().textContent) loadProject('Inbox'); //if the project thats going to be removed, switch to Inbox project
    tab.remove(); //remove project
  })

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
  taskController.loadTasks(tasksContainer, name);


  newTaskBtn.addEventListener('click', (e) => {
    taskController.formProject(taskController.newForm).value = getActiveProject().textContent;
    toggleDisplay(document.querySelector('#new-task-form'));
    toggleDisabled(document.querySelector('#content'));
  })

  return project
}


function loadProjectTabClickEvents() {
  const eventHandler = (e) => {
      loadProject(e.target.textContent);
      setActiveProject(e.target);
  }
  getAllTabs().forEach(btn => btn.addEventListener('click', eventHandler))
}


//tools


function getActiveProject() {
  const projectContainer = document.querySelector('#project-container');
  return projectContainer.querySelector('h2');
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

function loadFirstProjects() {
  if (JSON.parse(localStorage.getItem('projectArray')) == null) {

  data.getProjects().push(new Project("Inbox"));
  data.getProjects().push(new Project('Today', true));

  data.getProjects().push(new Project('Week', true));
  data.getProjects().push(new Project('School'));
  loadProject('Inbox')
  data.setTasks(data.loadTasksFromStorage())
  }
}

function setActiveProject(btn) {
  const projectTabs = Array.from(document.querySelector('#projects-tab-container').children);
  const permanentTabs = Array.from(document.querySelector('#permanent-categories').children);

  projectTabs.forEach(tab => {
    tab.firstChild.classList.remove('active-project');
  });
  permanentTabs.forEach(tab => {
    tab.classList.remove('active-project');
  })
  btn.classList.add('active-project');
}



export { loadPage }