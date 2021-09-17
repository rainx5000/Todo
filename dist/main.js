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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadPage\": () => (/* binding */ loadPage)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n\n\nfunction loadPage() {\n  //all of the clickevents that we need, like all of the buttons on the controls, should be a function\n  loadEvents();\n  loadProject('Inbox');\n  updateForm();\n}\n\nfunction loadEvents(){\n  const addProjectBtn = document.querySelector('#add-project');\n  const projectNameInput = document.querySelector('.project-name-input');\n  const permanentTabs = document.querySelector('#permanent-categories');\n  addProjectBtn.addEventListener('click', (e) => {\n    projectNameInput.classList.toggle('hidden');\n  });\n\n  projectNameInput.parentElement.addEventListener('submit', (e) => {\n    _data__WEBPACK_IMPORTED_MODULE_0__.data.newProject(projectNameInput.value);\n    createProjectTab(projectNameInput.value);\n    loadProject(projectNameInput.value);\n    clearInput(projectNameInput);\n    updateForm();\n\n    projectNameInput.classList.toggle('hidden');\n    // console.log(data.projects)\n  })\n\n  const permanentTabsArray = Array.from(permanentTabs.children);\n  permanentTabsArray.forEach(btn => {\n    btn.addEventListener('click', (e) => {\n      loadProject(e.target.textContent)\n    })\n  })\n  \n}\n\n\n\nfunction createProjectTab(projectName) {\n  const tabContainer = document.querySelector('#projects-tab-container')\n  const tab = document.createElement('button');\n  tab.textContent = projectName;\n  tabContainer.prepend(tab);\n  //add the option to delete this tab, also it should be a div rather than a button\n}\n\nfunction loadProject(projectName) {\n  const projectContainer = document.querySelector(\"#project-container\");\n  clearContainer(projectContainer);\n\n  projectContainer.append(createProject(projectName));\n}\n\nfunction createProject(name) {\n  const project = document.createElement(\"div\");\n  const title = document.createElement(\"h2\");\n  const tasksContainer = document.createElement(\"div\");\n  const newTaskBtn = document.createElement('button');\n  \n  project.classList.add('project');\n  tasksContainer.classList.add('tasks-container');\n\n  title.textContent = name;\n  newTaskBtn.textContent = \"Add Task\";\n\n  //loadTasks(taskContainer);\n\n  project.append(newTaskBtn, title, tasksContainer);\n\n  newTaskBtn.addEventListener('click', (e) => document.querySelector('#new-task-form').classList.toggle('hidden'));\n  return project\n}\n\nfunction loadTasks(container, projectName) {\n\n}\n\n\n\n\nfunction clearContainer(container) {\n  while (container.children.length !== 0) {\n    container.firstChild.remove();\n  }\n\n}\n\nfunction clearInput(inputs) {\n  inputs.value = '';\n}\n\nfunction updateForm() {\n  const projectSelect = document.querySelector('#project-select');\n  const projectList = _data__WEBPACK_IMPORTED_MODULE_0__.data.getProjects().map(project => project.name);\n  const optionList = Array.from(projectSelect.children).map(option => option.text);\n\n  projectList.forEach(name => {\n    if (optionList.includes(name)) return;\n    \n    const option = document.createElement('option');\n    option.text = name;\n    projectSelect.appendChild(option);\n    console.log(optionList)\n  })\n}\n\n\n\n\n\n//# sourceURL=webpack://todo/./src/UI.js?");

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"data\": () => (/* binding */ data)\n/* harmony export */ });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\n\n\nconst data = (() => {\n  const tasks = [];\n  const projects = [];\n\n  projects.push((0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"Inbox\"));\n  projects.push((0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('Today'));\n  projects.push((0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('This Week'));\n\n  const newProject = (name) => {\n    const project = (0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name);\n    projects.push(project);\n  }\n  const newTask = (title) => {\n    const task = (0,_task__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(title);\n    tasks.push(task);\n  }\n\n  const getTasks = () => tasks;\n  const getProjects = () => projects;\n\n  return {\n    tasks,\n    projects,\n    newProject,\n    newTask,\n    getTasks,\n    getProjects\n  }\n})()\n\n\n\n//# sourceURL=webpack://todo/./src/data.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n\n\n\nfunction Project(projectName, tasksArray) {\n  const name = projectName;\n  \n  let filteredTasks = [];\n\n  const filterByName = (name) => {\n    //create an empty array\n    //we will scan the full list of tasks, look for the property of the project name, \n    //if a task matches with the name of the project we are looking for, we will push it onto the array\n    //once the scan is complete, we will reassign filteredTasks to this array:\n    //filteredTasks = array;\n  }\n\n  return {\n    name,\n    filteredTasks,\n    filterByName\n  }\n}\n\n//# sourceURL=webpack://todo/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\n//factory function that creates a task object, then will export to data.js\n\nfunction Task(taskTitle, taskPriority, taskProject, taskDesc, taskDate) {\n    const title = taskTitle;\n    const description = taskDesc;\n    const priority = taskPriority;\n    const dueDate = taskDate;\n    const project = taskProject\n  return {\n    title,\n    description,\n    priority,\n    dueDate,\n    project\n  }\n}\n\n//# sourceURL=webpack://todo/./src/task.js?");

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