import { AddProject, DeleteProject, AddTodo } from "./index";
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

function CreateElement(element, className = null) {
    let ele = document.createElement(element);
    if (className) {
        ele.className = className;
    }
    return ele;
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
        ProjectViewClick();
    })
}

export function ProjectDeleteClick(){
    let deleteBtns = GetElement('.delete',true);
    AddClickEventListener(deleteBtns, DeleteProjectById);
}


function DeleteProjectById(e){
    let id = e.target.dataset.id;
    DeleteProject(id);

}


export function ProjectViewClick(){
    let viewBtns = GetElement('.view', true);
    AddClickEventListener(viewBtns, ViewProjectById)
    
}

function ViewProjectById(e) {
    let id = e.target.dataset.id;
    let main = GetElement('main');
    main.textContent = '';
    let btn = CreateElement('button','addTask');
    btn.dataset.id = id;
    btn.textContent = 'Create Task';
    AppendChild(main, btn);
    CreateTaskClick();

}

function CreateTaskClick() {
    let btns = GetElement('.addTask', true);
    AddClickEventListener(btns, LoadTaskForm)
    

}

export function LoadTaskForm(e) {
    let projectId = e.target.dataset.id;
    let main = GetElement('main');
    let form = CreateElement('form', 'task');

    let div1 = CreateElement('div');
    let label1 = CreateElement('label');
    label1.textContent = 'Name';
    let input1 = CreateElement('input');
    input1.setAttribute('name', 'title');
    AppendChild(div1, [label1, input1])

    let div2 = CreateElement('div');
    let label2 = CreateElement('label');
    label2.textContent = 'Color';
    let input2 = CreateElement('input');
    input2.setAttribute('name', 'color');
    input2.setAttribute('type', 'color')
    AppendChild(div2, [label2, input2]);

    let div3 = CreateElement('div');
    let label3 = CreateElement('label');
    label3.textContent = 'Due Date';
    let input3 = CreateElement('input');
    input3.setAttribute('name', 'dueDate');
    AppendChild(div3, [label3, input3]);

    let div4 = CreateElement('div');
    let label4 = CreateElement('label');
    label4.textContent = 'Description';
    let input4 = CreateElement('input');
    input4.setAttribute('name', 'description');
    AppendChild(div4, [label4, input4]);


    let div5 = CreateElement('div');
    let label5 = CreateElement('label');
    label5.textContent = 'Priority';
    let input5 = CreateElement('input');
    input5.setAttribute('name', 'priority');
    AppendChild(div5, [label5, input5]);

    let div6 = CreateElement('div');
    let label6 = CreateElement('label');
    label6.textContent = 'Notes';
    let input6 = CreateElement('input');
    input6.setAttribute('name', 'notes');
    AppendChild(div6, [label6, input6]);

    let div7 = CreateElement('div');
    let label7 = CreateElement('label');
    label7.textContent = 'Check List';
    let input7 = CreateElement('input');
    input7.setAttribute('name', 'checklist');
    AppendChild(div7, [label7, input7]);

    let input8 = CreateElement('input');
    input8.value = projectId;
    input8.setAttribute('name','projectId');
    input8.setAttribute('hidden', true);




    let button = CreateElement('button', 'taskBtn');
    button.setAttribute('type', 'button')
    button.textContent = 'Submit';

    AppendChild(form, [div1, div2, div3, div4, div5, div6, div7, input8, button]);

    AppendChild(main, form);

    TaskFormClick();


}

function TaskFormClick(){
    let btns = GetElement('.taskBtn', true);
    AddClickEventListener(btns, CreateTask);
}

function CreateTask(){
    let form = GetElement('.task');
    AddTodo(form.projectId.value, {
        title : form.title.value,
        color : form.color.value,
        dueDate : form.dueDate.value,
        description : form.description.value,
        priority : form.priority.value,
        notes : form.notes.value,
        checklist : form.checklist.value,
        projectId : form.projectId.value
    })

}





