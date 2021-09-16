import Project from './project'

const data = (() => {
  const tasks = [];
  const projects = [];

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