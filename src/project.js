import { data } from "./data";


export default function Project(projectName, val = false) {
  const name = projectName;
  const editable = val;
  
  let filteredTasks = [];

  const filterByName = (name) => {
    return data.getTasks().filter(task => task.project === name)
    //we will scan the full list of tasks, look for the property of the project name, 
    //if a task matches with the name of the project we are looking for, we will push it onto the array
    //once the scan is complete, we will reassign filteredTasks to this array:
    //filteredTasks = array;
  }
  const iseditable = () => editable;

  return {
    name,
    filteredTasks,
    filterByName,
    iseditable
  }
}