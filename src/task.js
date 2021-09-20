//factory function that creates a task object, then will export to data.js

import { data } from "./data";

export default function Task(taskTitle, taskPriority, taskProject, taskDesc, taskDate, id) {
  let TaskId = id;
  let title = taskTitle;
  let description = taskDesc;
  let priority = taskPriority;
  let dueDate = taskDate;
  let project = taskProject

  const getTitle = () => title;
  const setTitle = (value) => title = value;
  const getDescription = () => description;
  const setDescription = (value) => description = value;
  const getPriority = () => priority;
  const setPriority = (value) => priority = value;
  const getDate = () => dueDate;
  const setDate = (value) => dueDate = value;
  const getProject = () => project;
  const setProject = (value) => project = value;

  const getId = () => id;




  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getPriority,
    setPriority,
    getDate,
    setDate,
    getProject,
    setProject,
    getId
  }
}