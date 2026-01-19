import { Project } from "./projectFactory";
import { Todo } from "./todoFactory";

const appController = (() => {
    let projects = [];
    let activeProject = null;

    // Init
    const init = () => {
        createProject("Default");
        setActiveProject("Default");
    }

    // Project methods

    const createProject = (name) => {
        if(projects.some(p => p.name === name)) return false; //duplicate project check!
        const project = Project(name);
        projects.push(project);
        return project;
    };
    const deleteProject = (name) => {};
    const getProject = (name) => {
        return projects.find(p => p.name === name) || null;
    };
    const listProjects = () => {
        return projects;
    };

    // Active project states

    const setActiveProject = (name) => {
        const project = getProject(name);
        if(project) activeProject = project;
    };
    const getActiveProject = () => activeProject;

    // Todo methods

    const addTodo = (todoData) => {
        if(!activeProject) return null;

        const todo = Todo(
            todoData.title,
            todoData.description,
            todoData.dueDate,
            todoData.priority
        );

        activeProject.todos.push(todo);
        return todo;
    };
    const deleteTodo = (projectName, todoId) => {};
    const toggleTodoCompleted = (projectName, todoId) => {};

    

    return {
        init,
        createProject,
        deleteProject,
        getProject,
        listProjects,
        addTodo,
        deleteTodo,
        toggleTodoCompleted,
        setActiveProject,
        getActiveProject,
    };
})();

export { appController };