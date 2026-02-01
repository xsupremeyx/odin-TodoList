# TaskPilot 🗂️  
A simple and modular Todo List application built as part of **The Odin Project**.

TaskPilot allows users to organize tasks into projects, set priorities and due dates, and persist data using the Web Storage API.

## 🔗 Live Demo


## ✨ Features

### Projects
- Create multiple projects
- Rename existing projects
- Delete projects
- Automatically switch active project when one is removed

### Todos
- Add, edit, and delete todos
- Mark todos as completed
- Todos belong to a specific project
- Expand a todo to view its description
- Todos are sorted by:
  1. **Priority** (High → Medium → Low)
  2. **Due date** (earlier dates first)

### UI & UX
- Modal-based forms using the native `<dialog>` element
- Priority displayed using colored pills
- Completed todos are visually muted
- Overdue todos are subtly highlighted
- Responsive layout (works on smaller screens)

### Persistence
- All projects and todos are saved to `localStorage`
- Data is restored on page refresh

## 🛠️ Built With

- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **Webpack**
- **Web Storage API**
- **date-fns**

## 📅 date-fns Usage

The `date-fns` library is used for:

- **Formatting due dates** for display  
  (`format` + `parseISO`)
- **Sorting todos by due date**  
  (`compareAsc`)

Dates are stored in ISO format and formatted only at render time.

## 🧠 Architecture & Design

- Application logic and DOM rendering are separated
- Uses a controller module (`appController`) to manage state
- UI updates reactively using a simple publish–subscribe pattern
- Factory functions are used for creating Projects and Todos
- No frameworks used — everything is built with vanilla JavaScript


## 🚀 Getting Started

### Install dependencies
```bash
npm install
```

### What i Learned
Managing application state without frameworks

Structuring a JavaScript project with clear separation of concerns

Using the Web Storage API for persistence

Working with dates using a third-party library

Building accessible modal interfaces with <dialog>

