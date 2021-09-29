import Project from './project'
import Task from './task';

const data = (() => {
  let storedProjectsArray = JSON.parse(localStorage.getItem('projectArray'));
  let renderedProjects = [];

  const tasks = [];
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

  renderedProjects = loadProjectsFromStorage();

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
    tasks.push(task);
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
    loadProjectsFromStorage
  }
})()

export { data }