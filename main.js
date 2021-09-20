/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadPage\": () => (/* binding */ loadPage)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n\n\nconst taskController = (() => {\n  const newForm = document.querySelector('#new-task-form');\n  const formTitle = (form) => form.querySelector('.title');\n  const formPriority = (form) => form.querySelector('#priority-select');\n  const formProject = (form) => form.querySelector('#project-select');\n  const formDescription = (form) => form.querySelector('.description-input');\n  const formDate = (form) => form.querySelector('#date');\n  const formBtn = (form) => form.querySelector('.submit-task-btn');\n\n  const taskCheckbox = (task) => task.querySelector('.task-checkbox');\n  const taskTitle = (task) => task.querySelector('.task-title');\n  const taskDueDate = (task) => task.querySelector('.task-dueDate');\n  const taskEditBtn = (task) => task.querySelector('.task-edit-btn');\n  const taskRemoveBtn = (task) => task.querySelector('.task-remove-btn');\n\n\n\n  function loadTasks(projectContainer, projectName) {\n    const tasksArray = _data__WEBPACK_IMPORTED_MODULE_0__.data.getProjectByName(projectName).filterByName(projectName);\n    tasksArray.forEach(task => {\n      const domTask = createTask(task.getTitle(), task.getPriority());\n      projectContainer.append(domTask);\n      console.log(domTask);\n      loadTaskEvents(domTask);\n    })\n  }\n\n  function createTask(taskTitle, taskPriority) {\n    const task = document.createElement('div');\n    const checkboxContainer = document.createElement('div');\n    const checkbox = document.createElement('input');\n    const titleContainer = document.createElement('div');\n    const title = document.createElement('p');\n    const dueDateContainer = document.createElement('div');\n    const dueDate = document.createElement('p');\n    const editBtn = document.createElement('button');\n    const removeBtn = document.createElement('button');\n\n    checkbox.type = 'checkbox';\n    dueDate.textContent = '10/05/21';\n    title.textContent = taskTitle;\n    editBtn.innerHTML = '&#x2699;';\n    removeBtn.innerHTML = '&#215;';\n\n    checkboxContainer.append(checkbox);\n    titleContainer.append(title);\n    dueDateContainer.append(dueDate);\n    task.append(checkboxContainer, titleContainer, dueDateContainer, editBtn, removeBtn);\n\n    checkboxContainer.classList.add('task-checkbox-container');\n    checkbox.classList.add('task-checkbox');\n    titleContainer.classList.add('task-title-container');\n    title.classList.add('task-title');\n    dueDateContainer.classList.add('task-due-date-container');\n    dueDate.classList.add('task-dueDate');\n    editBtn.classList.add('task-edit-btn');\n    removeBtn.classList.add('task-remove-btn');\n\n    return task\n  }\n  function loadTaskFormSubmitEvent() {\n    const taskForm = document.querySelector('#new-task-form');\n  \n    taskForm.addEventListener('submit', (e) => { //create a function that only does this\n      e.preventDefault();\n      const task = taskController;\n      const newForm = document.querySelector('#new-task-form');\n      _data__WEBPACK_IMPORTED_MODULE_0__.data.newTask(task.formTitle(newForm).value, task.formPriority(newForm).value, task.formProject(newForm).value,\n                  task.formDescription(newForm).value, task.formDate(newForm).value);\n      loadProject(task.formProject(newForm).value);\n      toggleDisplay(taskForm);\n      _resetForm();\n      toggleDisabled(document.querySelector('#content'));\n    }) \n  }\n\n  function _resetForm() {\n    const newForm = document.querySelector('#new-task-form');\n    clearInput(taskController.formTitle(newForm));\n    clearInput(taskController.formDescription(newForm));\n    clearInput(taskController.formDate(newForm));\n    taskController.formPriority(newForm).value = 'Low';\n  }\n\n  function updateFormProjectList() {\n    const projectSelect = document.querySelector('#project-select');\n    const projectList = _data__WEBPACK_IMPORTED_MODULE_0__.data.getProjects().map(project => project.name);\n    const optionList = Array.from(projectSelect.children).map(option => option.text);\n  \n    projectList.forEach(name => {\n      // console.log(name, 'This Week')\n      if (name === 'Today') return ;\n      if (name === 'This Week') return;\n      if (optionList.includes(name)) return;\n  \n      const option = document.createElement('option');\n      option.text = name;\n      projectSelect.appendChild(option);\n    })\n        formProject.value = getActiveProject();\n  }\n\n  function getEditFormValues(task) {\n    const form = document.querySelector('.edit-form');\n    const taskData = _data__WEBPACK_IMPORTED_MODULE_0__.data.getTaskByName(taskTitle(task).textContent);\n    formTitle(form).value = taskData.getTitle();\n    formPriority(form).value = taskData.getPriority();\n    formProject(form).value = taskData.getProject();\n    formDescription(form).value = taskData.getDescription();\n    formDate(form).value = taskData.getDate();\n  }\n\n  function setEditFormValues(task) {\n    const form = document.querySelector('.edit-form');\n    const taskData = _data__WEBPACK_IMPORTED_MODULE_0__.data.getTaskByName(taskTitle(task).textContent);\n    console.log(taskTitle(task).textContent);\n    taskData.setTitle(formTitle(form).value);\n    taskData.setDescription(formDescription(form).value);\n    taskData.setPriority(formPriority(form).value);\n    taskData.setDate(formDate(form).value);\n    taskData.setProject(formProject(form).value);\n  }\n\n\n  function loadTaskEvents(task) {\n    taskEditBtn(task).addEventListener('click', editTaskHandler);\n    taskRemoveBtn(task).addEventListener('click', removeTaskHandler);\n    function editTaskHandler(e) {\n      const editForm = newForm.cloneNode(true);\n      const body = document.querySelector('body');\n    \n      editForm.querySelector('h2').textContent = 'Edit';\n      editForm.querySelector('button').textContent = 'Save';\n    \n    \n      body.append(editForm);\n      editForm.classList.add('edit-form');\n      getEditFormValues(task);\n      toggleDisplay(editForm);\n      toggleDisabled(document.querySelector('#content'));\n\n      editForm.addEventListener('submit', saveTaskHandler);\n\n      function saveTaskHandler(e) {\n        e.preventDefault();\n        setEditFormValues(task);\n        editForm.remove();\n        toggleDisabled(document.querySelector('#content'));\n        const taskData = _data__WEBPACK_IMPORTED_MODULE_0__.data.getTaskByName(taskTitle(task).textContent);\n        loadProject(taskData.getProject());\n      }\n    } \n    console.log(taskRemoveBtn(task), 'hELLO???')\n\n\n    function removeTaskHandler(e) {\n      const taskData = _data__WEBPACK_IMPORTED_MODULE_0__.data.getTaskByName(taskTitle(task).textContent);\n      const projectName = taskData.getProject();\n      _data__WEBPACK_IMPORTED_MODULE_0__.data.removeTask(taskData);\n      loadProject(projectName);\n    }\n  }\n\n\n\n  function submitEditTaskHandler(e) {\n    const editForm = document.querySelector('.edit-form');\n  }\n\n  function loadEditTaskEvents() {\n\n  }\n\n    //the edit form is going to scan the values from data, where we will find the tasks it derived from, and apply it to the screen. \n    //Anything we change, tasks from data will also be changed when we submit/or click save//\n    //once we clicked submit, we will remove the edit task form from existance.\n    //select content id, and disable pointer-events\n\n\n    \n\n\n  return {newForm, formTitle, formPriority, formProject, formDescription, formDate, formBtn, taskCheckbox,\n      taskTitle, taskDueDate, taskEditBtn, taskRemoveBtn, loadTasks, loadTaskFormSubmitEvent, updateFormProjectList};\n})()\n\n\nfunction loadPage() {\n  //all of the clickevents that we need, like all of the buttons on the controls, should be a function\n  loadEvents();\n  console.log(_data__WEBPACK_IMPORTED_MODULE_0__.data.getProjects())\n  renderProjectTabs(_data__WEBPACK_IMPORTED_MODULE_0__.data.getProjects())\n  loadProject('Inbox');\n  taskController.updateFormProjectList();\n}\n\nfunction loadEvents(){\n  loadProjectTabClickEvents();\n  loadAddProjectBtnEvent();\n  loadNewProjectSubmitEvent();\n  taskController.loadTaskFormSubmitEvent();\n\n}\n\n\n\n\n\n\nfunction loadAddProjectBtnEvent() {\n  const projectNameInput = document.querySelector('.project-name-input');\n  const addProjectBtn = document.querySelector('#add-project');\n  addProjectBtn.addEventListener('click', (e) => { //create a function that only does this\n    toggleDisplay(projectNameInput)\n  });\n}\n\nfunction loadNewProjectSubmitEvent() {\n  const projectNameInput = document.querySelector('.project-name-input');\n  projectNameInput.parentElement.addEventListener('submit', (e) => { //create a function that only does this\n    e.preventDefault();\n    console.log('yo')\n    _data__WEBPACK_IMPORTED_MODULE_0__.data.newProject(projectNameInput.value);\n    renderProjectTabs();\n    loadProject(projectNameInput.value);\n    clearInput(projectNameInput);\n    toggleDisplay(projectNameInput)\n    taskController.updateFormProjectList();\n  })\n}\n\nfunction createProjectTab(projectName) {\n\n\n  const tabsContainer = document.querySelector('#projects-tab-container');\n  const tabContainer = document.createElement('div');\n  const projectBtn = document.createElement('button');\n  const removeBtn = document.createElement('button');\n\n  removeBtn.innerHTML = '&#215;';\n  projectBtn.addEventListener('click', (e) => loadProject(e.target.textContent))\n\n  projectBtn.textContent = projectName;\n  tabsContainer.append(tabContainer);\n  tabContainer.append(projectBtn, removeBtn);\n  removeBtn.classList.add('remove-project-btn');\n\n  removeBtn.addEventListener('click', (e) => {\n    deleteProject(e);\n  });\n  //add the option to delete this tab, also it should be a div rather than a button\n}\n\nfunction loadProject(projectName) {\n  const projectContainer = document.querySelector(\"#project-container\");\n  deleteAllChildren(projectContainer);\n\n  projectContainer.append(createProject(projectName));\n\n}\n\nfunction deleteProject(e) {\n  const projectTabContainer = e.target.parentElement;\n  const projectData = _data__WEBPACK_IMPORTED_MODULE_0__.data.getProjectByName(projectTabContainer.firstChild.textContent);\n  _data__WEBPACK_IMPORTED_MODULE_0__.data.removeProject(projectData);\n  renderProjectTabs();\n}\n\nfunction renderProjectTabs () {\n  const domTabsArray = getAllTabs();\n  const dataTabsNames = getProjectsDataArray().map(tab => tab.getProjectName());\n  const domTabsNames = domTabsArray.map(tab => tab.firstChild.textContent);\n\n  dataTabsNames.forEach(tab => {\n    if (domTabsNames.includes(tab)) return;\n    createProjectTab(tab);\n  })\n\n  domTabsArray.forEach(tab => {\n    if (dataTabsNames.includes(tab.firstChild.textContent)) return;\n    if (tab.firstChild.textContent === getActiveProject()) loadProject('Inbox');\n    \n    tab.remove();\n  })\n\n}\n\nfunction createProject(name) {\n  const project = document.createElement(\"div\");\n  const title = document.createElement(\"h2\");\n  const tasksContainer = document.createElement(\"div\");\n  const newTaskBtn = document.createElement('button');\n  \n  project.classList.add('project');\n  tasksContainer.classList.add('tasks-container');\n\n  title.textContent = name;\n  newTaskBtn.textContent = \"Add Task\";\n\n\n\n  if (_data__WEBPACK_IMPORTED_MODULE_0__.data.getProjectByName(name).isnonProject()) {\n    project.append(title, tasksContainer);\n  } else {\n    project.append(newTaskBtn, title, tasksContainer);\n  }\n  taskController.loadTasks(tasksContainer, name);\n\n  newTaskBtn.addEventListener('click', (e) => {\n    console.log(taskController.formProject(taskController.newForm).value)\n    taskController.formProject(taskController.newForm).value = getActiveProject();\n    toggleDisplay(document.querySelector('#new-task-form'));\n    toggleDisabled(document.querySelector('#content'));\n  })\n\n  return project\n}\n\n\n\n\nfunction loadProjectTabClickEvents() {\n  const eventHandler = (e) => {\n      loadProject(e.target.textContent)\n  }\n  getAllTabs().forEach(btn => btn.addEventListener('click', eventHandler))\n}\n\n\n//tools\n\n\nfunction getActiveProject() {\n  const projectContainer = document.querySelector('#project-container');\n  return projectContainer.querySelector('h2').textContent;\n}\n\nfunction getAllTabs() {\n  const permanentTabs = document.querySelector('#permanent-categories');\n  const projectTabs = document.querySelector('#projects-tab-container');\n  const tabsArray = Array.from(permanentTabs.children).concat(Array.from(projectTabs.children));\n  return tabsArray;\n}\n\nfunction deleteAllChildren(container) {\n  while (container.children.length !== 0) {\n    container.firstChild.remove();\n  }\n}\n\nfunction toggleDisplay(element) {\n  element.classList.toggle('hidden');\n}\nfunction toggleDisabled(element) {\n  element.classList.toggle('disabled');\n}\n\nfunction clearInput(inputs) {\n  inputs.value = '';\n}\n\nfunction getProjectsDataArray() {\n  return _data__WEBPACK_IMPORTED_MODULE_0__.data.getProjects();\n}\n\n\n\n//# sourceURL=webpack://todo/./src/UI.js?");

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"data\": () => (/* binding */ data)\n/* harmony export */ });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\n\n\nconst data = (() => {\n  const tasks = [];\n  const projects = [];\n\n  projects.push((0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"Inbox\"));\n  projects.push((0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Today', true));\n\n  projects.push((0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('This Week', true));\n  projects.push((0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('School'));\n\n\n  const newProject = (name) => {\n    const project = (0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name);\n    getProjects().push(project);\n  }\n  const removeProject = (project) => {\n    getProjects().splice(getProjects().indexOf(project), 1);\n  }\n  const newTask = (title, priority, project, description, date) => {\n    const task = (0,_task__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(title, priority, project, description, date);\n    tasks.push(task);\n  }\n\n  const getTasks = () => tasks;\n  const getProjects = () => projects;\n  const getProjectByName = (name) => {\n    return getProjects().filter(project => project.name === name)[0];\n  }\n\n\n  const getTaskByName = (name) => {\n    return getTasks().filter(task => task.getTitle() === name)[0];\n  }\n\n  const removeTask = (task) => {\n    getTasks().splice(getTasks().indexOf(task), 1);\n  }\n\n  return {\n    tasks,\n    projects,\n    newProject,\n    newTask,\n    getTasks,\n    getProjects,\n    getProjectByName,\n    getTaskByName,\n    removeTask,\n    removeProject\n  }\n})()\n\n\n\n//# sourceURL=webpack://todo/./src/data.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI.js */ \"./src/UI.js\");\n\n\n(0,_UI_js__WEBPACK_IMPORTED_MODULE_0__.loadPage)();\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n\n\n\nfunction Project(projectName, val = false) {\n  const name = projectName;\n  const nonProject = val;\n  \n  let filteredTasks = [];\n\n  const filterByName = (name) => {\n    return _data__WEBPACK_IMPORTED_MODULE_0__.data.getTasks().filter(task => task.getProject() === name)\n  }\n  const filterByTime = (time) => {\n    //how we will filter tasks that are die today/this week\n  }\n  const isnonProject = () => nonProject;\n  const getProjectName = () => name;\n\n  return {\n    name,\n    filteredTasks,\n    filterByName,\n    isnonProject,\n    getProjectName\n  }\n}\n\n//# sourceURL=webpack://todo/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n//factory function that creates a task object, then will export to data.js\n\n\n\nfunction Task(taskTitle, taskPriority, taskProject, taskDesc, taskDate) {\n  let title = taskTitle;\n  let description = taskDesc;\n  let priority = taskPriority;\n  let dueDate = taskDate;\n  let project = taskProject\n\n  const getTitle = () => title;\n  const setTitle = (value) => title = value;\n  const getDescription = () => description;\n  const setDescription = (value) => description = value;\n  const getPriority = () => priority;\n  const setPriority = (value) => priority = value;\n  const getDate = () => dueDate;\n  const setDate = (value) => dueDate = value;\n  const getProject = () => project;\n  const setProject = (value) => project = value;\n\n\n\n\n  return {\n    getTitle,\n    setTitle,\n    getDescription,\n    setDescription,\n    getPriority,\n    setPriority,\n    getDate,\n    setDate,\n    getProject,\n    setProject\n  }\n}\n\n//# sourceURL=webpack://todo/./src/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;