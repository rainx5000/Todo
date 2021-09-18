import Project from './project'
import Task from './task';

const data = (() => {
  const tasks = [];
  const projects = [];

  projects.push(Project("Inbox"));
  projects.push(Project('Today', true));
  projects.push(Project('This Week', true));
  

  const newProject = (name) => {
    const project = Project(name);
    projects.push(project);
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

  return {
    tasks,
    projects,
    newProject,
    newTask,
    getTasks,
    getProjects,
    getProjectByName
  }
})()

export { data }