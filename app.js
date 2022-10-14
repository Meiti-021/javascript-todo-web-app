let $ = document;



const list = $.querySelector('.list');
const todoList = $.querySelector('.todo-list');
const todoSection = $.querySelector('.todo-section');
const todoTitle = $.querySelector('.todo-title');
const newListInput = $.querySelector('#list-input');
const newTodoInput = $.querySelector('#todo-input');
const addListBtn = $.querySelector('.add-list-btn');
const addTodoBtn = $.querySelector('.add-todo-btn');




const appData = { 
    listCounter : 0,
    lists : {}
};






addListBtn.addEventListener('click', ()=>{
    if(newListInput.value){
        if(appData.listCounter === 0){
            list.innerHTML = `<li class="list-item" onclick="listFocus(event)">${newListInput.value}</li>`;
            appData.listCounter ++;
            appData.lists[newListInput.value] = { todos: []}; 
            todoSection.style.visibility = 'visible';
            todoTitle.innerText = `${newListInput.value}`;
            todoList.innerHTML = ' <li class="todo-item" >Note your first todo</li>';
            newListInput.value = '';
        }
        else {
            list.innerHTML += `<li class="list-item" onclick="listFocus(event)">${newListInput.value}</li>`;
            appData.listCounter ++;
            appData.lists[newListInput.value] = { todos: []}; 
            todoTitle.innerText = `${newListInput.value}`;
            todoList.innerHTML = ' <li class="todo-item">Note your first todo</li>';
            newListInput.value = '';
        }
    }
});


newListInput.addEventListener('keyup', (event)=>{
    if(event.keyCode == 13){
        if(newListInput.value){
            if(appData.listCounter === 0){
                list.innerHTML = `<li class="list-item" onclick="listFocus(event)" >${newListInput.value}</li>`;
                appData.listCounter ++;
                appData.lists[newListInput.value] = { todos: [] }; 
                todoSection.style.visibility = 'visible';
                todoTitle.innerText = `${newListInput.value}`;
                todoList.innerHTML = ' <li class=" todo-item">Note your first todo</li>';
                newListInput.value = '';
            }
            else {
                list.innerHTML += `<li class="list-item" onclick="listFocus(event)" >${newListInput.value}</li>`;
                appData.listCounter ++;
                appData.lists[newListInput.value] = { todos: [] }; 
                todoTitle.innerText = `${newListInput.value}`;
                todoList.innerHTML = ' <li class="todo-item">Note your first todo</li>';
                newListInput.value = '';
            }
        }
    }
});


addTodoBtn.addEventListener('click', ()=> {
    if(newTodoInput.value){
        if(appData.lists[todoTitle.innerText].todos.length === 0){
            todoList.innerHTML = ` <li class="todo-item" onclick="check(event)">${newTodoInput.value}</li>`;
            appData.todoCounter ++;
            appData.lists[todoTitle.innerText].todos.push({ content: `${newTodoInput.value}`, condition : false });
            newTodoInput.value = '';
        } else {
            todoList.innerHTML += ` <li class="todo-item" onclick="check(event)">${newTodoInput.value}</li>`;
            appData.todoCounter ++;
            appData.lists[todoTitle.innerText].todos.push({ content: `${newTodoInput.value}`, condition : false });
            newTodoInput.value = '';
        }
    }
})



function listFocus(event){
    let allListItems = $.querySelectorAll('.list-item');
    allListItems.forEach((item)=>{
        item.style.listStyleType = 'circle';
    })
    event.target.style.listStyleType = 'disc';
    todoTitle.innerText = `${event.target.innerText}`;
    todoList.innerHTML = '';
    todoSection.style.visibility = 'visible';
    appData.lists[event.target.innerText].todos.forEach((element)=> {
        if(element.condition){
            todoList.innerHTML += ` <li class="todo-item" style="list-style-type: disc;" onclick="check(event)">${element.content}</li>`;
        }else {
            todoList.innerHTML += ` <li class="todo-item" style="list-style-type: circle;" onclick="check(event)">${element.content}</li>`;
        }
    })
}


function check(event){
    let mytodo = appData.lists[todoTitle.innerText].todos.findIndex((element)=>{
        return element.content === event.target.innerText
    });

    if(appData.lists[todoTitle.innerText].todos[mytodo].condition === false){
        appData.lists[todoTitle.innerText].todos[mytodo].condition = true;
        event.target.style.listStyleType = 'disc';
    } else {
        appData.lists[todoTitle.innerText].todos[mytodo].condition = false;
        event.target.style.listStyleType = 'circle';
    }
}


window.addEventListener('load', ()=>{
    let myData = JSON.parse(localStorage.getItem('localData'));
    console.log(myData);
    todoSection.style.visibility = 'hidden'
    appData.listCounter = 0;
    appData.listCounter = myData.listCounter;
    let myStData = Object.entries(myData.lists);
    console.log(myStData);
    list.innerHTML = '';
    myStData.forEach((listItem)=>{
        appData.lists[listItem[0]] = listItem[1];
        list.innerHTML += `<li class="list-item" onclick="listFocus(event)">${listItem[0]}</li>`;
    })
})



window.addEventListener('unload', ()=>{
    localStorage.removeItem('localData')
    localStorage.setItem('localData', JSON.stringify(appData));
})
