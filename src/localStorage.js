import { LoadProject } from "./dom";

export function GetProjects() {
    return JSON.parse(localStorage.getItem("projects") || "[]");
}

export function SetProjects(projects){
    if(projects.Length == 0) return;
    localStorage.setItem("projects", JSON.stringify(projects));
    LoadProject();
}


export function GetTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

export function SetTasks(tasks){
    if(tasks.Length == 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // LoadProject();
}