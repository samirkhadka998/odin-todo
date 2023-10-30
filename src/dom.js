import { AddProject, DeleteProject } from "./index";
import { GetProjects, SetProjects } from "./localStorage";
export default function LoadWrapper() {
    let wrapper = CreateElement('div', 'wrapper');
    let nav = LoadNav();
    let aside = LoadAside();
    let main = LoadMain();
    let footer = LoadFooter();
    AppendChild(wrapper, [nav, aside, main, footer]);
    let appRoot = GetElement('.app-root');
    AppendChild(appRoot, wrapper);
}

function LoadAside() {
    let aside = CreateElement('aside');
    let div = CreateElement('div', 'heading');
    let div2 = CreateElement('div', 'content');
    let h2 = CreateElement('h2');
    h2.textContent = 'Projects';
    let span = CreateElement('span');
    span.textContent = "+";
    AppendChild(div, [h2, span]);
    AppendChild(aside, div);
    AppendChild(aside, div2)


    return aside;
}

function LoadNav() {
    let nav = CreateElement('nav');
    let ul = CreateElement('ul');
    let li1 = CreateElement('li');
    li1.textContent = 'Home';
    let li2 = CreateElement('li');
    li2.textContent = 'About';
    let li3 = CreateElement('li', 'projectAdd');
    li3.textContent = 'Add Project';
    AppendChild(ul, [li1, li2, li3]);
    AppendChild(nav, ul);
    return nav;
}

function LoadFooter() {
    let footer = CreateElement('footer');
    footer.textContent = 'This is footer copyright';
    return footer;

}

function LoadMain() {
    let main = CreateElement('main');
    let div = CreateElement('div', 'heading');
    let h2 = CreateElement('h2');
    h2.textContent = 'Tasks';
    let span = CreateElement('span');
    span.textContent = '+';
    // AppendChild(div, [h2, span]);
    // AppendChild(main, div);
    return main;
}

export function NavClick() {
    let list = GetElement('nav li', true);
    AddClickEventListener(list, NavAction);
}


function NavAction(e) {
    if (e.target.className == 'projectAdd') {
        LoadProjectForm();
    }
}

export function LoadProjectForm() {
    let main = GetElement('main');
    main.textContent = '';
    let form = CreateElement('form', 'project');

    let div1 = CreateElement('div');
    let label1 = CreateElement('label');
    label1.textContent = 'Name';
    let input1 = CreateElement('input');
    input1.setAttribute('name', 'name');
    AppendChild(div1, [label1, input1])

    let div2 = CreateElement('div');
    let label2 = CreateElement('label');
    label2.textContent = 'Color';
    let input2 = CreateElement('input');
    input2.setAttribute('name', 'color');
    input2.setAttribute('type', 'color')
    AppendChild(div2, [label2, input2]);

    let button = CreateElement('button', 'projectBtn');
    button.setAttribute('type', 'button')
    button.textContent = 'Submit';

    AppendChild(form, [div1, div2, button]);

    AppendChild(main, form);


}

export function ProjectFormClick() {
    let btn = GetElement('.projectBtn');
    AddClickEventListener(btn, CreateProject);
}



function CreateProject() {
    console.log('form is called')
    let form = GetElement('.project');
    AddProject(form.name.value, form.color.value)

}

function LoadProjects(id, name, color) {

}

function CreateElement(element, className = null) {
    let ele = document.createElement(element);
    if (className) {
        ele.className = className;
    }
    return ele;
}

function assignClass(element, className) {
    element.className = className;
}

function AppendChild(parent, items) {
    if (Array.isArray(items)) {
        Array.from(items).forEach(i => {
            parent.appendChild(i);
        })
    }
    else {
        parent.appendChild(items);
    }

}

function GetElement(element, multiple = false) {
    if (!multiple) {
        return document.querySelector(element)
    }
    return document.querySelectorAll(element);
}

function AddClickEventListener(items, method) {
    console.log(items.length)
    if (Number(items.length) > 0) {
        Array.from(items).forEach(item => {
            item.addEventListener('click', method);
        })
    }
    else {
        items.addEventListener('click', method);
    }
}

export function LoadProject() {
    let content = GetElement('.content');
    content.textContent = '';
    let input = GetProjects();
    input.forEach(i => {
        let div = CreateElement('div');
        let span1 = CreateElement('span', 'color');
        span1.style.background = i.color;
        span1.style.color = i.color;
        let span2 = CreateElement('span');
        span2.textContent = i.name;

        let btn = CreateElement('button', 'view');
        btn.textContent = 'View';
        btn.dataset.id = i.id;

        let btn1 = CreateElement('button', 'delete');
        btn1.textContent = 'Delete';
        btn1.dataset.id = i.id;
        AppendChild(div, [span1, span2, btn, btn1])
        AppendChild(content, div);
        ProjectDeleteClick();
    })
}

export function ProjectDeleteClick(){
    let deleteBtns = GetElement('.delete',true);
    AddClickEventListener(deleteBtns, FindProjectIndex);
}

function FindProjectIndex(e){
    let id = e.target.dataset.id;
    DeleteProject(id);

}



