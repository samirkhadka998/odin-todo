import { AddProject, DeleteProject, AddTodo, DeleteTodo, Todo, GetDateDetails, UpdateTodo } from "./index";
import { GetProjects, GetTodoCounter, GetTodos, SetTodos } from "./localStorage";
import { formatDistance, subDays } from 'date-fns'

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
    AppendChild(div, h2);
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
    li3.textContent = '+ Add Project';
    AppendChild(ul, [li1, li2, li3]);
    AppendChild(nav, ul);
    AddClickEventListener([li1, li2, li3], NavAction);
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
    let div2 = CreateElement('div', 'createTodo')
    let div3 = CreateElement('div', 'todoItems');
    h2.textContent = 'Todos';
    AppendChild(div, [h2, div2, div3]);
    AppendChild(main, div);
    return main;
}


function NavAction(e) {
    if (e.target.className == 'projectAdd') {
        LoadProjectDialog();
    }
    else if (e.target.textContent == 'Home') {
        LoadHome();
    }
    else {
        LoadAbout();
    }
}

export function LoadProjectDialog() {
    let wrapper = GetElement('.wrapper');
    let olddialog = GetElement('.projectDialog');
    if (olddialog) {
        wrapper.removeChild(olddialog);
    }
    let dialog = CreateElement('dialog', 'projectDialog');
    let closeBtn = CreateElement('button', 'closeProject')
    closeBtn.textContent = 'x';
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
    AddClickEventListener(button, CreateProject);

    AppendChild(form, [div1, div2, button]);

    AppendChild(dialog, [closeBtn, form]);

    AppendChild(wrapper, dialog)

    dialog.showModal();
    AddClickEventListener(closeBtn, CloseProjectDialog)


}

function CloseProjectDialog() {
    let dialog = GetElement('.projectDialog');
    dialog.close();
}





function CreateProject() {
    let form = GetElement('.project');
    AddProject(form.name.value, form.color.value)
    CloseProjectDialog();

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
    if (Number(items.length) > 0) {
        Array.from(items).forEach(item => {
            item.addEventListener('click', method);
        })
    }
    else {
        items.addEventListener('click', method);
    }
}

export function LoadProject(projects) {
    let content = GetElement('.content');
    content.textContent = '';
    // projects = GetProjects();
    projects.forEach(i => {
        let div = CreateElement('div');
        let span = CreateElement('span');
        span.textContent = i.id;
        let span1 = CreateElement('span', 'color');
        span1.style.background = i.color;
        span1.style.color = i.color;
        let span2 = CreateElement('span');
        span2.textContent = i.name;

        let btn = CreateElement('i', 'view');
        btn.classList.add("fa","fa-eye")
        btn.title = 'View';
        btn.dataset.id = i.id;

        let btn1 = CreateElement('i', 'delete');
        btn1.classList.add("fa","fa-close")
        btn1.title = 'Delete';
        btn1.dataset.id = i.id;

        let btn2 = CreateElement('i', 'createTodo');
        btn2.classList.add("fa","fa-plus")
        btn2.title = 'Add Todo';
        btn2.dataset.id = i.id;

        let span3 = CreateElement('span', 'duedate');
        if (i.datetime) {

            span3.textContent = '';

        }

        AppendChild(div, [span1, span2, btn2, btn1, btn, span3])
        AppendChild(content, div);
        AddClickEventListener(btn1, DeleteProjectById);
        AddClickEventListener(btn, ViewProjectById)
        AddClickEventListener(btn2, LoadTodoForm)
    })



}



function DeleteProjectById(e) {
    let id = e.target.dataset.id;
    DeleteProject(id);

}




function ViewProjectById(e) {
    let id = e.target.dataset.id;
    let todosCopy = [...GetTodos()];
    todosCopy = todosCopy.filter(t => t.projectId == id);
    LoadTodo(todosCopy)
    HightlightElement(e.target)
}



export function LoadTodoForm(e, todo) {
    let update = false;
    if (todo != undefined) {
        update = true;
    }
    let wrapper = GetElement('.wrapper');
    let olddialog = GetElement('.todoDialog');
    if (olddialog) {
        wrapper.removeChild(olddialog);
    }
    let dialog = CreateElement('dialog', 'todoDialog')
    let closeBtn = CreateElement('button', 'todoDialogClose');
    closeBtn.textContent = 'x';

    //for update this is id not parent project id 
    let projectId = e.target.dataset.id;
    HightlightElement(e.target);
    let form = CreateElement('form', 'todo');

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
    input3.setAttribute('type', 'datetime-local');
    let datetime = new Date();
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let addExtraMinute = new Date(Date.now() + (5 * 60 * 1000)).toISOString();
    input3.setAttribute('value', now)
    input3.setAttribute('min', datetime.toISOString());
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

    //for update projectId is not projectID it is todo  Id 
    input8.value = projectId;
    input8.setAttribute('name', 'projectId');
    input8.setAttribute('hidden', true);
    
    //not in below condition becuase of scope for add event listener
    let button = CreateElement('button', 'todoBtn');
    let buttonUpdate = CreateElement('button', 'todoBtn');




    if (update) {
        input1.value = todo.title || '';
        input2.value = todo.color || 'black';
        input3.value = todo.dueDate ? new Date(todo.dueDate).toISOString() : new Date();
        input4.value = todo.description || '';
        input5.value = todo.priority || '';
        input6.value = todo.notes || '';
        input7.value = todo.checklist || '';
        input8.value = todo.projectId || '';
        let input9 = CreateElement('input');
        input9.value = todo.id;
        input9.setAttribute('name', 'id');
        input9.setAttribute('hidden', true);
        buttonUpdate.setAttribute('type', 'button')
        buttonUpdate.textContent = 'Update';
        AppendChild(form, [div1, div2, div3, div4, div5, div6, div7, input8, input9, buttonUpdate]);
    }
    else {
        button.setAttribute('type', 'button')
        button.textContent = 'Submit';
        AppendChild(form, [div1, div2, div3, div4, div5, div6, div7, input8, button]);
    }




    AppendChild(dialog, [closeBtn, form]);

    AppendChild(wrapper, dialog)

    dialog.showModal();

    if (update) {
        AddClickEventListener(buttonUpdate, UpdateExisitingTodo)
    }
    else {

        AddClickEventListener(button, CreateTodo);
    }
    AddClickEventListener(closeBtn, CloseTodoDialog)


}

function UpdateExisitingTodo(e) {
    let form = GetElement('.todo');
    let todo = new Todo(form.title.value, form.color.value, form.description.value, form.priority.value, form.notes.value, form.checklist.value,
        form.projectId.value, form.dueDate.value, form.id.value);
    UpdateTodo(todo.id, todo);
    CloseTodoDialog();
}

function CloseTodoDialog() {
    let dialog = GetElement('.todoDialog');
    dialog.close();
}


function CreateTodo() {
    let form = GetElement('.todo');
    let datetime = new Date();
    let todo = new Todo(form.title.value, form.color.value, form.description.value, form.priority.value, form.notes.value, form.checklist.value,
        form.projectId.value, form.dueDate.value);
    AddTodo(form.projectId.value, todo)
    CloseTodoDialog();

}

export function LoadTodo(todos) {
    let todoItems = GetElement('.todoItems');
    todoItems.textContent = '';
    // todos = GetTodos();
    todos.forEach(i => {
        let div = CreateElement('div');
        let span1 = CreateElement('span', 'color');
        span1.style.background = i.color;
        span1.style.color = i.color;
        let span2 = CreateElement('span');
        span2.textContent = i.title;

        let span3 = CreateElement('span');
        if (i.dueDate) {
            let futureDueDate = new Date(i.dueDate);
            // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
            let message = formatDistance(futureDueDate, new Date(), { addSuffix: true });
            if (message.includes('ago')) {
                span3.style.color = 'red';
            }
            else {
                span3.style.color = 'green';
                span3.textContent = message;
            }

        }

        let btn = CreateElement('i', 'deletetodo');
        btn.classList.add("fa", "fa-edit")
        btn.title = 'Update';
        btn.dataset.id = i.id;

        let btn1 = CreateElement('i', 'updatetodo');
        btn1.classList.add("fa", "fa-close")
        btn1.title = 'Delete';
        btn1.dataset.id = i.id;
        AppendChild(div, [ span1, span2, span3, btn, btn1])
        AppendChild(todoItems, div);
        AddClickEventListener(btn, UpdateTodoById)
        AddClickEventListener(btn1, DeleteTodoById)


    })

}

function UpdateTodoById(e) {
    let id = e.target.dataset.id;
    let todoCopy = [...GetTodos()];
    let todo = todoCopy.find(t => t.id == id);
    LoadTodoForm(e, todo);
}

function DeleteTodoById(e) {
    let id = e.target.dataset.id;
    DeleteTodo(id);

}

function HightlightElement(ele) {
    let parentElement = ele.parentElement.parentElement;
    let children = parentElement.childNodes;
    Array.from(children).forEach(div => {
        div.classList.remove('highlight');
    })
    ele.parentElement.classList.add('highlight');

}


export function LoadHome() {
    // let main = GetElement('main');
    // main.textContent = 'Home';
}

export function LoadAbout() {
    // let main = GetElement('main');
    // main.textContent = 'About';
}


