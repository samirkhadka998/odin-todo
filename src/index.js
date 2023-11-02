// import "./style.css"
import LogMessage from "./log";
import LoadWrapper, {NavClick,LoadProjectForm, ProjectFormClick, LoadProject, LoadTodo} from "./dom";
import { GetProjects, SetProjects, GetTodos, SetTodos, GetProjectCounter, GetTodoCounter } from "./localStorage";



LoadWrapper();


let projects = GetProjects();
let todos = GetTodos();

if(projects.length > 0){
    LoadProject(projects);
    let firstProject = projects.sort((a,b) => a.id > b.id ? 1 : -1)[0];
    let todosCopy = [...todos];
    todosCopy = todosCopy.filter(t => t.projectId == firstProject.id);
    LoadTodo(todosCopy)
}







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


export function AddTodo(projectid, todo){
    // if(!ValidateTodo(projectid,todo)){
    //     return;
    // }
    todos.push(todo);
    ReloadTodos(projectid);
   
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
    ReloadTodos(todo.projectId);
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
    return todos.some(todo => todo.title == title && todo.projectId == id)

}

