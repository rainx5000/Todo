import { addDays, format } from "date-fns";
import { data } from "./data";


export default function Project(projectName, val = false) {
  const name = projectName;
  const nonProject = val;
  
  let filteredTasks = [];

  const filterByName = (name) => {
    return data.getTasks().filter(task => task.project === name)
  }
  const filterByTime = (time) => {
    const now = new Date();

    if (time === "Today") {
      const lastDay = format(now, "yyyy-MM-dd");

      return data.getTasks().filter(task => task.dueDate === lastDay)

    } else if (time === "Week"){
      const lastDay = addDays(now, 7);
      const lastDayFormatted = format(lastDay, "yyyy-MM-dd");

      return data.getTasks().filter(task => {
        const taskDay = task.dueDate;
        console.log(taskDay)
        return (taskDay <= lastDayFormatted) && (taskDay >= format(now, "yyyy-MM-dd"));
      })
    }
  }
  const isnonProject = () => nonProject;
  const getProjectName = () => name;

  return {
    name,
    filteredTasks,
    nonProject,
    filterByName,
    isnonProject,
    getProjectName,
    filterByTime
  }
}