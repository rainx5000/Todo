import Project from './project'

const data = (() => {
  const tasks = [];
  const projects = [];

  const newProject = (name) => {
    const project = Project(name);
    projects.push(project);
  }

  return {
    tasks,
    projects,
    newProject
  }
})()

export { data }