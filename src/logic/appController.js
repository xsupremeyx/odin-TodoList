import { Project } from "./projectFactory";
import { Todo } from "./todoFactory";

const appController = (() => {
    let projects = [];
    let activeProject = null;
    let subscribers = [];

    // Init
    const init = () => {
        createProject("Default");
        setActiveProject("Default");
    }

    const subscribe = (fn) => {
        subscribers.push(fn);
    };

    // Project methods

    const createProject = (name) => {
        if(projects.some(p => p.name === name)) return false; //duplicate project check!
        const project = Project(name);
        projects.push(project);
        subscribers.forEach(fn => fn());
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
        subscribers.forEach(fn => fn());
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
        subscribers.forEach(fn => fn());
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
        subscribers.forEach(fn => fn());

        return todo;
    };
    const deleteTodo = (todoId) => {
        if(!activeProject) return;

        activeProject.todos = activeProject.todos.filter(todo => todo.id !== todoId);
        subscribers.forEach(fn => fn());

    };
    const toggleTodoCompleted = (todoId) => {
        if(!activeProject) return;
        const todo = activeProject.todos.find(todo => todo.id === todoId);
        if(todo) todo.completed = !todo.completed;
        subscribers.forEach(fn => fn());
    };

    const getSortedTodos = () => {
        if(!activeProject) return [];

        const priorityRank = { High: 3, Medium: 2, Low: 1 };

        return [...activeProject.todos].sort((a,b)=> {
            // Sort by priority first
            const pA = priorityRank[a.priority] || 0;
            const pB = priorityRank[b.priority] || 0;
            if(pA !== pB) return pB - pA; // Higher priority first
            // Then by due date
            const dA = new Date(a.dueDate);
            const dB = new Date(b.dueDate);
            return dA - dB; 
        });
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
        subscribe,
        getSortedTodos
    };
})();

export { appController };