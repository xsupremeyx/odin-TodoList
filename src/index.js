// will import all files required and handle the main page logic rendering

import "./styles.css";

import { homePageController } from './home.js';
import { appController } from './logic/appController.js';
import { applicationView } from "./ui/applicationView.js";


const navBarController = ( () => {
    let homeBtn;
    let applicationBtn;
    let contentDiv;

    window.appController = appController;
    window.applicationView = applicationView;
    appController.init();

    const cacheDOM = () => {
        homeBtn = document.getElementById('home-btn');
        applicationBtn = document.getElementById('application-btn');
        contentDiv = document.querySelector('.content');
    }

    const renderHomePage = () => {
        homePageController.init(contentDiv);
    }

    const renderApplicationPage = () => {
        // Placeholder for application page rendering logic
        applicationView.init(contentDiv);
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

    return { init, renderHomePage, renderApplicationPage}
})();

navBarController.init();
window.addEventListener("navigateToApplication", navBarController.renderApplicationPage);