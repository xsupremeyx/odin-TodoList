import { appController } from '../logic/appController.js';

const applicationView = ( () => {
    let contentDiv;

    const init = (parentDiv) => {
        contentDiv = parentDiv;
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
        sidebar.appendChild(addBtn);

        // Project List
        const projectList = document.createElement('div');
        projectList.classList.add('project-list');

        const projects = appController.listProjects();
        projects.forEach(project => {
            const item = document.createElement('div');
            item.classList.add('project-item');
            item.textContent = project.name;

            // Click event to set active project
            item.addEventListener('click',() => {
                appController.setActiveProject(project.name);
                render();
            });
            projectList.appendChild(item);
        });
        sidebar.appendChild(projectList);
        return sidebar;
    };

    const renderMain = () => {
        const main = document.createElement('div');
        main.classList.add('main-content');
        return main;
    };

    return {init, render };
})();

export { applicationView };
