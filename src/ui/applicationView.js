import { appController } from '../logic/appController.js';

const applicationView = ( () => {
    let contentDiv;
    let expandedTodos = new Set();
    let modal;

    const init = (parentDiv) => {
        contentDiv = parentDiv;
        createModal();
        appController.subscribe(render);
        expandedTodos.clear();
        render();
    };

    const createModal = () => {
        modal = document.createElement('dialog');
        modal.id = 'app-modal';
        contentDiv.appendChild(modal);
        modal.close();
    };

    const render = () => {
        const oldPage = contentDiv.querySelector('#application-page');
        if (oldPage) oldPage.remove();
        const container = document.createElement('div');
        container.id = 'application-page';

        container.appendChild(renderSidebar());
        container.appendChild(renderMain());
        contentDiv.appendChild(container);
    };

    const renderSidebar = () => {
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');

        // header
        const header = document.createElement('h3');
        header.textContent = 'Projects';
        sidebar.appendChild(header);

        //  Add Button
        const addBtn = document.createElement('button');
        addBtn.textContent = '+ Add Project';
        addBtn.classList.add('add-project-btn');
        addBtn.addEventListener('click', () => {
            const name = prompt("Enter project name: ");

            if(!name) return;

            const created = appController.createProject(name);
            if(!created){
                alert("project already exists!");
                return;
            }
            appController.setActiveProject(name);
        });
        sidebar.appendChild(addBtn);

        // Project List
        const projectList = document.createElement('div');
        projectList.classList.add('project-list');

        const projects = appController.listProjects();
        projects.forEach(project => {
            const item = document.createElement('div');
            item.classList.add('project-item');
            // item.textContent = project.name;

            if(project === appController.getActiveProject()){
                item.classList.add('active');
            }

            // left project name
            const nameSpan = document.createElement('span');
            nameSpan.textContent = project.name;
            nameSpan.classList.add('project-name');

            // right delete bttn
            const delBtn = document.createElement('button');
            delBtn.textContent = "🗑";
            delBtn.classList.add('project-delete-btn');

            // click project name → set active
            item.addEventListener('click', () => {
                appController.setActiveProject(project.name);
            });

            // delete button → delete project
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                appController.deleteProject(project.name);
            });
            item.appendChild(nameSpan);
            item.appendChild(delBtn);
            projectList.appendChild(item);
        });
        sidebar.appendChild(projectList);
        return sidebar;
    };

    const renderMain = () => {
        const main = document.createElement('div');
        main.classList.add('main-content');

        const todos = appController.getSortedTodos();

        // header for active project
        const active = appController.getActiveProject();
        if(active){
            const title = document.createElement('h2');
            title.textContent = active.name;
            main.appendChild(title);

            // Add Todo Button
            const addBtn = document.createElement('button');
            addBtn.textContent = '+ Add Todo';
            addBtn.classList.add('add-todo-btn');

            addBtn.addEventListener('click', () => {
                // addTodoPromptFlow();
                openTodoModal();
            });

            main.appendChild(addBtn);
        }

        if(todos.length === 0){
            const msg = document.createElement('p');
            msg.textContent = "No tasks yet. Add one!";
            main.appendChild(msg);
            return main;
        }

        todos.forEach(todo => {
            main.appendChild(renderToDoCard(todo));
        })

        return main;
    };

    const renderToDoCard = (todo) => {
        const card = document.createElement('div');
        card.classList.add('todo-card');

        if (expandedTodos.has(todo.id)) {
            card.classList.add('expanded');
        }

        // collapsed row header
        const row = document.createElement('div');
        row.classList.add('todo-row');

        const title = document.createElement('span');
        title.classList.add('todo-title');
        title.textContent = todo.title;

        const due = document.createElement('span');
        due.classList.add('todo-date');
        due.textContent = todo.dueDate;

        const priority = document.createElement('span');
        priority.classList.add('todo-priority');
        priority.textContent = todo.priority;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.classList.add('todo-checkbox');

        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            appController.toggleTodoCompleted(todo.id);
        });

        // prevent collapse on change event too
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
        });

        row.addEventListener('click', (e) => {
            if (e.target === checkbox) return;
            if (expandedTodos.has(todo.id)) {
                expandedTodos.delete(todo.id);
            } else {
                expandedTodos.add(todo.id);
            }
            render();
        });

        row.appendChild(title);
        row.appendChild(due);
        row.appendChild(priority);
        row.appendChild(checkbox);

        const details = document.createElement('div');
        details.classList.add('todo-details');
        details.textContent = todo.description || "";

        const delBtn = document.createElement('button');
        delBtn.textContent = "🗑";
        delBtn.classList.add('todo-delete-btn');
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            appController.deleteTodo(todo.id);
        });
        row.appendChild(delBtn);
        card.appendChild(row);
        card.appendChild(details);

        return card;
    };

    const label = (text) => {
        const l = document.createElement('label');
        l.textContent = text;
        return l;
    };

    const openTodoModal = () => {
        modal.innerHTML = '';

        const form = document.createElement('form');

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Title';
        titleInput.required = true;
        form.appendChild(label("Title"));
        form.appendChild(titleInput);

        const descInput = document.createElement('textarea');
        descInput.placeholder = 'Description';
        form.appendChild(label("Description"));
        form.appendChild(descInput);

        const prioritySelect = document.createElement('select');
        ['High', 'Medium', 'Low'].forEach(p => {
            const opt = document.createElement('option');
            opt.value = p;
            opt.textContent = p;
            prioritySelect.appendChild(opt);
        });
        form.appendChild(label("Priority"));
        form.appendChild(prioritySelect);

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        form.appendChild(label("Due Date"));
        form.appendChild(dateInput);

        const btnRow = document.createElement('div');
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', () => modal.close());
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Add Todo';
        btnRow.appendChild(cancelBtn);
        btnRow.appendChild(submitBtn);
        form.appendChild(btnRow);

        // submit handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            appController.addTodo({
                title: titleInput.value,
                description: descInput.value,
                priority: prioritySelect.value,
                dueDate: dateInput.value
            });
            modal.close();
        });

        modal.appendChild(form);
        modal.showModal();
    };

    return {init, render };
})();

export { applicationView };
