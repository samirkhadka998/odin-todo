// import "./style.css"
import LogMessage from "./log";
import LoadWrapper, {NavClick,LoadProjectForm, ProjectFormClick, LoadProject, ProjectDeleteClick} from "./dom";
import { GetProjects, SetProjects } from "./localStorage";



LoadWrapper();
NavClick();
LoadProjectForm();
ProjectFormClick();


let projects = GetProjects();
LoadProject();
let todos = [];





class Project {
    static IdGenerator = 0;
    constructor(name, color){
        Project.IdGenerator +=  1;
        this.id = Project.IdGenerator
        this.name = name;
        this.color = color;
    }
}


class Todo{
    static IdGenerator = 0;
    constructor(title, color, dueDate, description, priority, notes, checklist, projectId){
        Todo.IdGenerator +=  1;
        this.id = Todo.IdGenerator;
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

// function GetProjects(id){
//     if(id){
//         return this.projects.filter(p => p.id == id)[0];
//     }
//     return projects;
// }

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

function DeleteTodo(input) {
    
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

function GetTodos(id) {
    return todo.filter(t => t.projectId == id);
}

