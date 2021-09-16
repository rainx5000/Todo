//factory function that creates a task object, then will export to data.js

export default function Task(taskTitle, taskDesc, taskPriority, taskDate, taskProject) {
    const title = taskTitle;
    const description = taskDesc;
    const priority = taskPriority;
    const dueDate = taskDate;
    const project = taskProject
  return {
    title,
    description,
    priority,
    dueDate,
    project
  }
}