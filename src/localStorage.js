import { LoadProject } from "./dom";

export function GetProjects() {
    return JSON.parse(localStorage.getItem("projects") || "[]");
}

export function SetProjects(projects){
    if(projects.Length == 0) return;
    localStorage.setItem("projects", JSON.stringify(projects));
    LoadProject();
}


export function GetTodos() {
    return JSON.parse(localStorage.getItem("todos") || "[]");
}

export function SetTodos(todos){
    if(todos.Length == 0) return;
    localStorage.setItem("todos", JSON.stringify(todos));
    // LoadProject();
}