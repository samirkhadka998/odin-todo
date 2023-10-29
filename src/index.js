// import "./style.css"
import LogMessage from "./log";
import LoadWrapper from "./dom";

LoadWrapper();
let projects = [];
let todos = [];

class Project {
    static IdGenerator = 0;
    constructor(name, color){
        Project.IdGenerator +=  1;
        this.id = Project.IdGenerator
        this.name = name;
        this.color = color;
        this.id = GenerateId();
    }
}


class Todo{
    static IdGenerator = 0;
    constructor(title, dueDate, description, priority, notes, checklist, projectId){
        Todo.IdGenerator +=  1;
        this.id = Todo.IdGenerator;
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.projectId = projectId;
    }
}

function GetProjects(id){
    if(id){
        return this.projects.filter(p => p.id == id)[0];
    }
    return projects;
}

function AddProject(name, color,){
    if(CheckProjectExist(name)){
        LogMessage(`Project with ${name} already exist`)
        return;
    }
    let project = new Project(name, color);
    this.projects.push(project);
    
}



function CheckProjectExist(name) {
    return this.projects.some(p => p.name = name);
}

function DeleteProject(id) {
    
}
function AddTodo(id, todo){
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
    return project.todos.some(todo => todo.title == title)

}

function GetTodos(id) {
    return todo.filter(t => t.projectId == id);
}
