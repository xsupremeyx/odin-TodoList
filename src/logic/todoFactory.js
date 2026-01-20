function Todo(title, description, dueDate, priority, completed = false, id = crypto.randomUUID()) {

    return {
        id,
        title,
        description,
        dueDate,
        priority,
        completed
    };
}

export { Todo };