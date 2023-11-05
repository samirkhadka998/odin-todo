// import "./style.css"
import LogMessage from "./log";
import LoadWrapper, { NavClick, LoadProjectForm, ProjectFormClick, LoadProject, LoadTodo } from "./dom";
import { GetProjects, SetProjects, GetTodos, SetTodos, GetProjectCounter, GetTodoCounter } from "./localStorage";
import Swal from 'sweetalert2'


LoadWrapper();


let projects = GetProjects();
let todos = GetTodos();

if (projects.length > 0) {
    LoadProject(projects);
    let firstProject = projects.sort((a, b) => a.id > b.id ? 1 : -1)[0];
    let todosCopy = [...todos];
    todosCopy = todosCopy.filter(t => t.projectId == firstProject.id);
    LoadTodo(todosCopy)
}



class Project {
    constructor(name, color) {
        let datetime = new Date();
        this.id = GetProjectCounter()
        this.name = name;
        this.color = color;
        this.datetime = datetime.toISOString();
    }
}


export class Todo {
    constructor(title, priority, projectId, dueDate, id = undefined) {
        let datetime = new Date();
        if (id) {
            this.id = id;
        }
        else {
            this.id = GetTodoCounter();
        }
        this.title = title;
        this.dueDate = datetime.toISOString();
        this.priority = priority;
        this.projectId = projectId;
        this.dueDate = dueDate;
    }
}

export function AddProject(name, color) {
    if(!name){
        LogMessage('valid','info')
        return;
    }
    if (CheckProjectExist(name)) {
        LogMessage(`check`, 'info')
    }
    else{
        let datetime = new Date();
        let project = new Project(name, color, datetime.toISOString());
        projects.push(project);
        LogMessage();
        ReloadProjects();
    
    }
    
}



function CheckProjectExist(name) {
    return projects.some(p => p.name.toLowerCase() == name.toLowerCase());
}

export function DeleteProject(id) {
    let projectCopy = [...projects]
    let todoCopy = [...todos];
    let project = projectCopy.find(p => p.id == id);
    todoCopy = todoCopy.filter(t => t.projectId == id);
    let message = `Are you sure you want to delete ${project.name} ? It has ${todoCopy.length} todos`;

    Swal.fire({
        title: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            todos = todos.filter(t => t.projectId != id);
            projects = projects.filter(p => p.id != id);
            ReloadTodos();
            ReloadProjects();
            Swal.fire(
                'Deleted!',
                'Project has been deleted.',
                'success'
            )
        }
    })


}

function ReloadProjects() {
    SetProjects(projects);
    projects = GetProjects();
}


export function AddTodo(projectid, todo) {
    if(!ValidateTodo(projectid,todo)){
        return;
    }
    todos.push(todo);
    LogMessage();
    ReloadTodos(projectid);

}

export function UpdateTodo(id, todo) {
    let index = todos.findIndex(t => t.id == id)
    if (index != -1) {
        todos[index] = todo;
        LogMessage("update");
        ReloadTodos(todo.projectId);
    }


}

function ReloadTodos(projectId) {
    SetTodos(todos);
    let todosCopy = [...GetTodos()];
    todosCopy = todosCopy.filter(t => t.projectId == projectId);
    LoadTodo(todosCopy);
}

export function DeleteTodo(id) {

    //to find projectId
    let todoCopy = [...todos];
    //we use find becuase it returns object , unlike filter which return arrary regarless of result count
    let todo = todoCopy.find(t => t.id == id);


    //changing orginal array
    todos = todos.filter(t => t.id != id);
    LogMessage('delete')
    ReloadTodos(todo.projectId);
}


function ValidateTodo(id, todo) {
    let isValid = true;
    if (!todo.title) {
        LogMessage('valid', 'info');
        isValid = false;
    }
    
    else if (CheckTodoExist(id, todo.title)) {
        LogMessage('check', 'info')
        isValid = false;
    }
    return isValid;
}

function CheckTodoExist(id, title) {

    return todos.some(todo => todo.title.toLowerCase() == title.toLowerCase() && todo.projectId == id)

}

export function GetDateDetails(date) {
    return {
        dd: String(date.getDate()).padStart(2, '0'),
        mm: String(date.getMonth() + 1).padStart(2, '0'),
        yyyy: date.getFullYear(),
        hh: String(date.getHours() + 1).padStart(2, '0'),
        mi: String(date.getMinutes() + 1).padStart(2, '0'),
    }
}

