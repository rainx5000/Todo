import Project from './project'
import Task from './task';

const data = (() => {
  const tasks = [];
  const projects = [];

  projects.push(Project("Inbox"));
  projects.push(Project('Today'));
  projects.push(Project('This Week'));

  const newProject = (name) => {
    const project = Project(name);
    projects.push(project);
  }
  const newTask = (title) => {
    const task = Task(title);
    tasks.push(task);
  }

  const getTasks = () => tasks;

  return {
    tasks,
    projects,
    newProject,
    newTask,
    getTasks
  }
})()

export { data }