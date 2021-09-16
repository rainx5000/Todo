import { data } from "./data";


export default function Project(name, tasksArray) {
  const projectName = name;
  
  let filteredTasks = [];

  const filterByName = (name) => {
    //create an empty array
    //we will scan the full list of tasks, look for the property of the project name, 
    //if a task matches with the name of the project we are looking for, we will push it onto the array
    //once the scan is complete, we will reassign filteredTasks to this array:
    //filteredTasks = array;
  }

  return {
    projectName,
    filteredTasks,
    filterByName
  }
}