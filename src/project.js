import { addDays, format } from "date-fns";
import { data } from "./data";


export default function Project(projectName, val = false) {
  const name = projectName;
  const nonProject = val;
  
  let filteredTasks = [];

  const filterByName = (name) => {
    return data.getTasks().filter(task => task.getProject() === name)
  }
  const filterByTime = (time) => {
    const now = new Date();

    if (time === "Today") {
      const lastDay = format(now, "yyyy-MM-dd");

      return data.getTasks().filter(task => task.getDate() === lastDay)

    } else if (time === "This Week"){
      const lastDay = addDays(now, 7);
      const formattedDay = format(lastDay, "dd")
      const formattedMonth = format(lastDay, 'MM');
      console.log('yo')


      return data.getTasks().filter(task => {
        const taskDay = task.getDate().split('-');

        return (taskDay[2] <= formattedDay && taskDay[1] === formattedMonth);
      })
    }


  }
  const isnonProject = () => nonProject;
  const getProjectName = () => name;

  return {
    name,
    filteredTasks,
    filterByName,
    isnonProject,
    getProjectName,
    filterByTime
  }
}