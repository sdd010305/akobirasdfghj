const todoForm = document.querySelector(".todo_add form");
const todoInput = document.querySelector(".todo_add form .todo__input");
const todoWrapper = document.querySelector(".wrapper");

// Edit Modal
const editModal = document.querySelector(".edit__modal");
const todoEditForm = document.querySelector(".edit__modal form");
const todoEditInput = document.querySelector(
  ".edit__modal form .edit__todo__input"
);

const spinnerDiv = document.getElementById('loader');

const spinner = {
    show() {
        spinnerDiv.style.display = 'block';
    },
    hide() {
        spinnerDiv.style.display = 'none';
    }
}

let state = [];
spinner.show();
api.getAllTodos().then((res) => {
    state = res.data;
    spinner.hide();
    drawUIByState();
});

todoForm.addEventListener("submit", function (event) {

    event.preventDefault();
    // console.log(todoInput.value.trim());
    const todoText = keepOnlyPlainTodoText(todoInput.value.trim());
    todoInput.value = "";


    if(!todoText) {
        alert(`to'g'ri malumot kiriting`);
        return;
    }
    addTodoToState(todoText);
});

todoEditForm.addEventListener("submit", function (event) {

    event.preventDefault();
    console.log(todoInput.value.trim());
    const todoText = keepOnlyPlainTodoText(todoEditInput.value.trim());
    const todoId = +todoEditInput.dataset.todoId;
    todoInput.value = "";


    if(!todoText) {
        alert(`to'g'ri malumot kiriting`);
        return;
    }
    updateEditeTodo(todoText, todoId);
});


const makeID = (state) => {
    if (!state.length) return 1;
  
    return state[state.length - 1].id + 1; 
};
  
const addTodoToState = (todoText) => {
    const newTodo = {
      text: todoText,
      completed: false,
      id: makeID(state),
    };

    state.push(newTodo);
    spinner.show();
    api.updateTodos(state).then(() => {
        drawUIByState();
        spinner.hide();
    });
  
  
};
   // ====================================== Update start ================
const updateEditeTodo = (todoText, todoId) => {
    const todoIndex = state.findIndex((elem ) => elem.id === todoId);
    state[todoIndex].text = todoText;


    spinner.show();
    api.updateTodos(state).then(() => {
        drawUIByState();
        spinner.hide();
    });
    hideEditModal();
}

const showEditModal = (todoText, todoId) => {
    editModal.style.display = "flex";
    todoEditInput.value = todoText;
    todoEditInput.dataset.todoId = todoId;
}
const hideEditModal = ( ) => {
    editModal.style.display = "none";
    todoEditInput.value = "";
    delete todoEditInput.dataset.todoId;
}

const editTodo = (id) => {
    const todo = state.find((elem) => elem.id === id);
    showEditModal(todo.text, id);
}

   // ====================================== Update finish ================

const drawUIByState = () => {
    let todosHTML = "";

    state.forEach(( todo, index ) => {
        let oneTodoHtml = makeOneTodoHtmlContent(todo, index + 1);
        todosHTML += oneTodoHtml;
    });

    todoWrapper.innerHTML = todosHTML;
};

const deleteTodo = (id) => {
    const idx = state.findIndex( todo => todo.id === id)
    state.splice(idx, 1);

    spinner.show();
    api.updateTodos(state).then(() => {
        drawUIByState();
        spinner.hide();
    });
}

const keepOnlyPlainTodoText = (inputTodoText) => {
    const safeInputTodoText = filterXSS(inputTodoText, {
        whiteList:          {},        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                       // to filter out its content
    });

    return safeInputTodoText;
}

const makeOneTodoHtmlContent = (todo, todoindex) => {

    const safeTodoText = keepOnlyPlainTodoText(todo.text);

    const todoContent = `
    <div class="one_wrapper">
        <div class="one_content">
        <h3> ${todoindex}.   ${safeTodoText}</h3>
        </div>
        <div class="one_actions">
        <button class="button_edit" onclick=editTodo(${todo.id})>Edit</button>
        <button class="button_delete" onclick=deleteTodo(${todo.id})> Delete</button>
        </div>
    </div>
    
    `
    return todoContent;
}







