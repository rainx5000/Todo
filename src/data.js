import Project from './project'

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

  const getTasks = () => tasks;

  return {
    tasks,
    projects,
    newProject,
    getTasks
  }
})()

export { data }