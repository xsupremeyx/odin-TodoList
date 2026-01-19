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
    const deleteProject = (name) => {
        const index = projects.findIndex(p => p.name === name);
        if(index === -1) return;

        const deletingActive = (activeProject && activeProject.name === name);
        projects.splice(index, 1);

        // project reassignment if active project deleted
        if(deletingActive){
            if(projects[index]){
                // if next project exists then it becomes active!
                activeProject = projects[index];
            }
            else if(projects[index - 1]){
                // prev project becomes active!
                activeProject = projects[index - 1];
            }
            else{
                activeProject = null; // no projects left
            }
        }
    };
    
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
    const deleteTodo = (todoId) => {
        if(!activeProject) return;

        activeProject.todos = activeProject.todos.filter(todo => todo.id !== todoId);
    };
    const toggleTodoCompleted = (todoId) => {
        if(!activeProject) return;
        const todo = activeProject.todos.find(todo => todo.id === todoId);
        if(todo) todo.completed = !todo.completed;
    };

    

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