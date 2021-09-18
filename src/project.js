import { data } from "./data";


export default function Project(projectName, val = false) {
  const name = projectName;
  const nonProject = val;
  
  let filteredTasks = [];

  const filterByName = (name) => {
    return data.getTasks().filter(task => task.getProject() === name)
  }
  const filterByTime = (time) => {
    //how we will filter tasks that are die today/this week
  }
  const isnonProject = () => nonProject;

  return {
    name,
    filteredTasks,
    filterByName,
    isnonProject
  }
}