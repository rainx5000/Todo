import Project from './project'
import Task from './task';

const data = (() => {
  const tasks = [];
  const projects = [];

  projects.push(Project("Inbox"));
  projects.push(Project('Today', true));

  projects.push(Project('This Week', true));
  projects.push(Project('School'));


  const newProject = (name) => {
    const project = Project(name);
    getProjects().push(project);
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

  return {
    tasks,
    projects,
    newProject,
    newTask,
    getTasks,
    getProjects,
    getProjectByName,
    getTaskByName,
    removeTask,
    removeProject
  }
})()

export { data }