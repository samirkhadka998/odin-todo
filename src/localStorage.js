import { LoadProject } from "./dom";

export function GetProjects() {
    return JSON.parse(localStorage.getItem("projects") || "[]");
}

export function SetProjects(projects){
    if(projects.Length == 0) return;
    localStorage.setItem("projects", JSON.stringify(projects));
    LoadProject(projects);
}

export function GetProjectCounter(){
    let counter = localStorage.getItem('projectCounter');
    if(counter){
        counter = Number(counter) + 1;
    }
    else{
        counter = 0;
    }
    localStorage.setItem('projectCounter', JSON.stringify(counter))
    return counter;
}

export function GetTodoCounter(){
    let counter = localStorage.getItem('todoCounter');
    if(counter){
        counter = Number(counter) + 1;
    }
    else{
        counter = 0;
    }
    localStorage.setItem('todoCounter', JSON.stringify(counter))
    return counter;
}

export function GetTodos() {
    return JSON.parse(localStorage.getItem("todos") || "[]");
}

export function SetTodos(todos){
    if(todos.Length == 0) return;
    localStorage.setItem("todos", JSON.stringify(todos));
}