
export default function LoadWrapper(){
    let wrapper = CreateElement('div','wrapper');
    let nav = CreateElement('nav');
    let aside = LoadAside();
    let main = CreateElement('main');
    let footer = CreateElement('footer');
    AppendChild(wrapper, [nav, aside ,main, footer]);
    let appRoot = GetElement('.app-root');
    AppendChild(appRoot, wrapper);
}

function LoadAside(){
    let aside = CreateElement('aside');
    let div = CreateElement('div','heading');
    let h2 = CreateElement('h2');
    h2.textContext = 'Projects';
    let span = CreateElement('span');
    span.textContext = "+";
    AppendChild(div, [h2,span]);
    AppendChild(aside, div);
    return aside;
}

function LoadProjects(id,name,color){

}

function CreateElement(element, className = null) {
    let ele =  document.createElement(element);
    if(className){
        ele.className = className;
    }
    return ele;
}

function assignClass(element,className){
    element.className = className;
}

function AppendChild(parent, items){
    if(Array.isArray(items)){
        Array.from(items).forEach(i => {
            parent.appendChild(i);
        })
    }
    else{
        parent.appendChild(items);
    }
    
}

function GetElement(element, multiple = false){
    if(!multiple){
        return document.querySelector(element)
    }
    return document.querySelectorAll(element);
}

function AddClickEventListener(items, method){
    if(Array.isArray(items)){
        Array.from(items).forEach(item => {
            item.addEventListener('click', method);
        })
    }
    else{
        items.addEventListener('click',method);
    }
}


