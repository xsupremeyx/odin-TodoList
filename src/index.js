// will import all files required and handle the main page logic rendering

import "./styles.css";

import { homePageController } from './home.js';
import { appController } from './logic/appController.js';


const navBarController = ( () => {
    let homeBtn;
    let applicationBtn;
    let contentDiv;

    window.appController = appController;
    appController.init();

    const cacheDOM = () => {
        homeBtn = document.getElementById('home-btn');
        applicationBtn = document.getElementById('application-btn');
        contentDiv = document.querySelector('.content');
    }

    const renderHomePage = () => {
        homePageController.init(contentDiv);
        console.log('Home Page Rendered');
    }

    const renderApplicationPage = () => {
        // Placeholder for application page rendering logic
        console.log('Application Page Rendered');
    }

    const bindEvents = () => {
        homeBtn.addEventListener('click', renderHomePage);
        applicationBtn.addEventListener('click', renderApplicationPage);
    }

    const init = () => {
        cacheDOM();
        bindEvents();
        renderHomePage(); // default page
    }

    return { init, renderHomePage}
})();

navBarController.init();