import { appController } from '../logic/appController.js';

const applicationView = ( () => {
    let contentDiv;
    let expandedTodos = new Set();

    const init = (parentDiv) => {
        appController.subscribe(render);
        contentDiv = parentDiv;
        expandedTodos.clear();
        render();
    };

    const render = () => {
        contentDiv.replaceChildren();
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
            item.textContent = project.name;

            if(project === appController.getActiveProject()){
                item.classList.add('active');
            }

            // Click event to set active project
            item.addEventListener('click',() => {
                appController.setActiveProject(project.name);
            });
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
                addTodoPromptFlow();
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

        card.appendChild(row);
        card.appendChild(details);

        return card;
    }

    const addTodoPromptFlow = () => {
        const title = prompt("Todo title: ");
        if(!title) return;

        const priority = prompt("Priority (High, Medium, Low): ", "Medium");
        if(!priority) return;

        const dueDate = prompt("Due Date (YYYY-MM-DD):");
        if(!dueDate) return;

        appController.addTodo({
            title,
            description: "",
            dueDate,
            priority
        });
    }

    return {init, render };
})();

export { applicationView };
