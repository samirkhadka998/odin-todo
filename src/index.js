// import "./style.css"
import LogMessage from "./log";
import LoadWrapper, {NavClick,LoadProjectForm, ProjectFormClick, LoadProject} from "./dom";
import { GetProjects, SetProjects, GetTodos, SetTodos, GetProjectCounter, GetTodoCounter } from "./localStorage";



LoadWrapper();


let projects = GetProjects();
LoadProject(projects);

let todos = GetTodos();





class Project {
    constructor(name, color){
        this.id = GetProjectCounter()
        this.name = name;
        this.color = color;
    }
}


class Todo{
    constructor(title, color, dueDate, description, priority, notes, checklist, projectId){
        this.id = GetTodoCounter();
        this.title = title;
        this.color = color;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.projectId = projectId;
    }
}

export function AddProject(name, color){
    if(CheckProjectExist(name)){
        LogMessage(`Project with ${name} already exist`)
        return;
    }
    let project = new Project(name, color);
    projects.push(project);
    ReloadProjects();
    
}



function CheckProjectExist(name) {
    return projects.some(p => p.name == name);
}

export function DeleteProject(id) {
    let index = projects.indexOf(projects.filter(p => p.id == id));
    projects.splice(index,1);
    ReloadProjects();
    
}

function ReloadProjects() {
    SetProjects(projects);
    projects = GetProjects();
}


export function AddTodo(id, todo){
    if(!ValidateTodo(id,todo)){
        return;
    }
    todos.push(todo);
   
}

function ReloadTodos() {
    SetProjects(todos);
    todos = GetTodos();
}

function DeleteTodo(input) {
    let index = todos.indexOf(todos.filter(t => t.id == id));
    todos.splice(index,1);
    ReloadProjects();
}


function ValidateTodo(id,todo){
    let isValid = true;
    if(!todo.title){
        LogMessage('Title is needed.');
        isValid = false;
    }
    if(!todo.priority){
        LogMessage('Priority is needed.')
        isValid = false;
    }
    else if(CheckTodoExist(id, todo)){
        LogMessage('Title already in todo item')
        isValid =  false;
    }
    return isValid;
}

function CheckTodoExist(id, title){
    let project = GetProjects(id);
    return todos.some(todo => todo.title == title && todo.id == id)

}

