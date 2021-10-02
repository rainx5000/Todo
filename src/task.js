//factory function that creates a task object, then will export to data.js

import { data } from "./data";

export default function Task(taskTitle, taskPriority, taskProject, taskDesc, taskDate, id) {
  let title = taskTitle;
  let description = taskDesc;
  let priority = taskPriority;
  let dueDate = taskDate;
  let project = taskProject

  return {
    get title() {
      return title;
    },
    set title(value) {
      return title = value;
    },
    get description() {
      return description;
    },
    set description(value) {
      return description = value;
    },
    get priority() {
      return priority;
    },
    set priority(value) {
      return priority = value;
    },
    get dueDate() {
      return dueDate;
    },
    set dueDate(value) {
      return dueDate = value;
    },
    get project() {
      return project;
    },
    set project(value) {
      return project = value;
    },
  }
}