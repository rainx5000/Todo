import Project from './project'
import Task from './task';

const data = (() => {
  let tasks = [];
  let projects = [];

  const loadProjectsFromStorage = () => {
    let storedProjectsArray = JSON.parse(localStorage.getItem('projectArray'));
    if (storedProjectsArray == null) return []
    storedProjectsArray.forEach(project => {
      console.log(projects)
      projects.push(new Project(project.name, project.nonProject))
    })
  }

  const loadTasksFromStorage = () => {
    let storedTasksArray = JSON.parse(localStorage.getItem('taskArray'));
    if (storedTasksArray == null) return []
    storedTasksArray.forEach(task => {
      tasks.push(new Task(task.title, task.priority, task.project, task.description, task.dueDate, task.completed));
    })
    console.log(tasks);
  }



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
  const setTasks = (value) => tasks = value;
  const getProjects = () => projects;
  const getProjectByName = (name) => {
    return getProjects().filter(project => project.name === name)[0];
  }


  const getTaskByName = (name) => {
    return getTasks().filter(task => task.title === name)[0];
  }
  const getTaskByProject = (name) => {
    return getTasks().filter(task => task.project === name);
  }

  const removeTask = (task) => {
    getTasks().splice(getTasks().indexOf(task), 1);
  }
  const removeTasksByProjectName = (projectName) => {
    const tasksToRemoveArray = getTaskByProject(projectName);
    console.log(tasksToRemoveArray)
    tasksToRemoveArray.forEach(task => {
      getTasks().splice(getTasks().indexOf(task), 1);
      console.log(getTasks())
    })
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
    setTasks,
    getProjects,
    getProjectByName,
    getTaskByName,
    removeTask,
    removeProject,
    saveProjectToLocalStorage,
    saveTaskToLocalStorage,
    loadProjectsFromStorage,
    loadTasksFromStorage,
    removeTasksByProjectName
  }
})()

export { data }