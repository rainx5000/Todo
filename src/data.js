import Project from './project'
import Task from './task';

const data = (() => {
  let storedProjectsArray = JSON.parse(localStorage.getItem('projectArray'));
  let storedTasksArray = JSON.parse(localStorage.getItem('taskArray'));
  let renderedProjects = [];
  let renderedTasks = [];

  let tasks = renderedTasks;
  let projects = renderedProjects;



  const loadProjectsFromStorage = () => {
    if (storedProjectsArray == null) return []
    storedProjectsArray.map(project => {
      renderedProjects = [];
      projects.push(new Project(project.name, project.nonProject))
      return projects;
    })
    console.log(projects);
  }

  const loadTasksFromStorage = () => {
    console.log(storedTasksArray, 'yesssss')
    if (storedTasksArray == null) return []
    storedTasksArray.map(task => {
      renderedProjects = [];
      tasks.push(new Task(task.title, task.priority, task.project, task.description, task.dueDate));
      return tasks;
    })
    console.log(tasks);
  }

  renderedProjects = loadProjectsFromStorage();
  renderedTasks = loadTasksFromStorage();

  const newProject = (name) => {
    const project = Project(name);
    getProjects().push(project);
    saveProjectToLocalStorage(projects);
  }
  const removeProject = (project) => {
    getProjects().splice(getProjects().indexOf(project), 1);
  }
  const newTask = (title, priority, project, description, date) => {
    const task = Task(title, priority, project, description, date);
    getTasks().push(task);
    saveTaskToLocalStorage(tasks);
  }

  const getTasks = () => tasks;
  const getProjects = () => projects;
  const getProjectByName = (name) => {
    return getProjects().filter(project => project.name === name)[0];
  }


  const getTaskByName = (name) => {
    return getTasks().filter(task => task.getTitle() === name)[0];
  }

  const removeTask = (task) => {
    getTasks().splice(getTasks().indexOf(task), 1);
  }

  const saveProjectToLocalStorage = (array) => {
    localStorage.setItem('projectArray', JSON.stringify(array));
  }

  const saveTaskToLocalStorage = (array) => {
    localStorage.setItem('taskArray', JSON.stringify(array));
  }


  return {
    newProject,
    newTask,
    getTasks,
    getProjects,
    getProjectByName,
    getTaskByName,
    removeTask,
    removeProject,
    saveProjectToLocalStorage,
    saveTaskToLocalStorage,
    loadProjectsFromStorage,
    loadTasksFromStorage
  }
})()

export { data }