const homePageController = ( () => {
    let contentDiv;
    let container;
    let card;
    let heading;
    let subheading;
    let goToButton;

    const cacheDOM = (contentDIV) => {
        contentDiv = contentDIV;
    }

    const setupDOM = () => {
        container = document.createElement('div');
        container.id = 'home-page';

        card = document.createElement('div');
        card.classList.add('card');

        heading = document.createElement('h2');
        heading.textContent = 'Welcome to TaskPilot';

        subheading = document.createElement('p');
        subheading.textContent = 'Your ultimate task management solution.';

        goToButton = document.createElement('button');
        goToButton.type = 'button';
        goToButton.textContent = 'Start Now!';
    }

    const bindEvents = () => {
        // Placeholder for future event bindings
        goToButton.addEventListener('click', () => {
            console.log('Start Now button clicked');
        });
    }

    const render = () => {
        contentDiv.replaceChildren(); // Clear previous content
        container.replaceChildren(); // Clear previous content
        card.appendChild(heading);
        card.appendChild(subheading);
        card.appendChild(goToButton);
        container.appendChild(card);
        contentDiv.appendChild(container);
    }

    const init = (contentDIV) => {
        cacheDOM(contentDIV);
        setupDOM();
        bindEvents();
        render();
    }

    return { init };
})();

export { homePageController };