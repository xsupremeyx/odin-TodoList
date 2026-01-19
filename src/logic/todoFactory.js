function Todo(title, description, dueDate, priority) {
    const id = crypto.randomUUID();

    return {
        id,
        title,
        description,
        dueDate,
        priority,
        completed: false,
    };
}

export { Todo };