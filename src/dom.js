
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
    let h2 = CreateElement('h2');
    h2.textContent = 'Projects';
    let span = CreateElement('span');
    span.textContent = "+";
    AppendChild(div, [h2, span]);
    AppendChild(aside, div);
    return aside;
}

function LoadNav() {
    let nav = CreateElement('nav');
    let ul = CreateElement('ul');
    let li1 = CreateElement('li');
    li1.textContent = 'Home';
    let li2 = CreateElement('li');
    li2.textContent = 'About';
    let li3 = CreateElement('li');
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
    AppendChild(div, [h2, span]);
    AppendChild(main, div);
    return main;
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
    if (Array.isArray(items)) {
        Array.from(items).forEach(item => {
            item.addEventListener('click', method);
        })
    }
    else {
        items.addEventListener('click', method);
    }
}


