Project: Todo List

We will create our todo list task, and projects(categories), with a factory function
By default, the user only requires the name of the task, if there is no name, you cannot create that task

Our tasks would need:

None-expanded:
checkbox(radio input), title, dueDate, priority? editBtn removeBtn(X)

Exanded:
title
description
dueDate
priority?
removeBtn
Project Location (dropdown menu of all the projects we have)

Checklist

We should have a side section for showing the projects,
We will edit/add/remove projects
and we can create new tasks, but only with name input, it will make everything else empty, and the user can edit everything else.
Create a Today, and This week category so we can view them all

Above the projects names should be the tasks that are in the project.

[tasks]
[project1]


Create an object, by default, that should be stored in an array that will be rendered into the page. That could be anything, just so the user has a project of some sort on first load up. 
  --That can be a general Project, that the user cannot remove.

Seperate application logic from the DOM-related stuff, so keep them in a different module. 

When I click on Inbox it will show the tasks that are not in a designated project name. Then it will be showcased just like we show projects, by Appending it to the project container. 

All of our tasks will be stored in an array. They will be created using a factory function, but eventually stored in in an array, probably named tasks or some sort. We could have a data module. Where it all gets stored, Lets say we created a task, all the info should be stored in this module, and used where intended. We could have a module function that does all of the data work, like storing, and having functions that can get the data that we may need. 


Task1: Create our inbox container through the project factory function. 

Inbox should be a built in project type object. It would be an object, and be appended to the page almost like a project. The filtering would be different, it will only append the tasks that have no project. By default, whenever the user loads the page, Inbox should be loaded. 


Task 1:

Create our factory function for projects. 
Our factory function would take tasks array. 
This function would run when the user enters the name of the project. Then the name would be processed inside it, and the array will get filtered using a method to only include tasks that are assigned to that project name. Then we will export this object out into the DOM, where it will do the DOM stuff and showcase it to the page for the user. 



data.js //
will include:
task names array
project names array


When a user clicks add project btn:

1: input gets appended under the last project, with it activated
2: when the user clicks enter, or submits that input, that input will disappear
3: the input value gets saved into the project array
4: We will automatically show that project to the user even if its empty, since they would want to add tasks to it, so we will run it through a DOM function that will take the name of the project, and the array of the tasks list.
5: We should run that function, which would filter out all the tasks that are not assigned to the project, at this point it should be empty. 
6: append the project to the project container. 



On loadup 
1: all event listeners that we need to be loaded in
2: Our three projects (Inbox, today, this week, should be created and loaded up)

loadProject(projectName)

This function would take the name of project as the argument, it will search for it from the projects array, Then takes that object and appends the project to the project container with its tasks

our Project factory function will have methods where we can filter out the allTasksArray, and save it to the filteredTasks array.


loadProject(projectName)
This function will remove all children(last project) from the project-container
Will append the projectName to the projectContainer

createProject(projectName) should return a project created with DOM, with a task-container, create a class name to target it. 



we should have a controller for our projects and tasks

When loadProject('Inbox') runs, eventually we will the project container for the user to see, with all its tasks.

Inside of it, we will have a function that creates the project container

Then we will have a function, that has a parameter that will take that same project container, and will load the tasks that match the project name

loadProject('Inbox') {
  const project = createProject('Inbox'); // project is the DOM container
  loadTasks(project) //this will append all tasks to the project
}

loadTasks(project) {
  const tasks = data.filterByName(project.name);
  tasks.forEach(append to the project)
}


if task property project is undefined, that task would go under Inbox





When I click on the edit btn on a task:

It will clone the new task form, and change a few components:
1 - change New to Edit
2 - change add to Save 

the save btn would have a new event listener, either the form would listen to submit, or the btn would listen for a click. 

We would then need to find that task in the tasks array in data, and have it changed with task methods such as editTitle(textcontent) => changes the task.name

for each task item
we would have these for example:

const name = 'Do Hw';

function getName = gets the name
function setName = changes name to new value


When I click on add task, Project, should be preselected under the project that is being shown onto the page.



create renderProjectTabs(DataTabsArray); // ['school', 'gym', 'frat']
  const domTabsArray = [tab, tab, tab]
  const domTabsNameArray = domTabsArray.map(domtab => domtab.firstChild.textcontent) // ['school', 'gym', 'practice']

  dataTabsArray.foreach(
    if domTabsNameArray.included(tab.getTitle()) return //if dom tab is included
                                                        //in the array, do nothing
    data.newProject(tab.getTitle());                //else create new tab
    createProjectTab(tab.getTitle());
  )

  domTabsNameArray.forEach(tabName    //if tab from data, is included in dom tab
    if DataTabsArray.included(!tabName) return      //do nothing
    
    data.removeProject(tabName)                                       
  )

tabCreation should only be based on the projects tabs, if

we will use date-fns for today and this week



Low - default = light green
Moderate = light orange
High = light red



When we click on Today or This week console.log the time of NOW

We will have a method inside of project.js

We will run filterByTime only when we have This week or Today as our project name

If today, we will filter out everything that is due today.

if this week, we will filter out everything that is due for the next 7 days

1999-07-10
