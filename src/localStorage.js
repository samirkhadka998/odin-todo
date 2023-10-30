import { LoadProject } from "./dom";

export function GetProjects() {
    return JSON.parse(localStorage.getItem("projects") || "[]");
}

export function SetProjects(projects){
    if(projects.Length == 0) return;
    localStorage.setItem("projects", JSON.stringify(projects));
    LoadProject();
}