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
