---
name: todo
description: Manage project tasks in todos.md. Use to add, complete, list, and remove project todos.
---

# Project Todo Manager

Manage todos in `todos.md` at the project root.

## Usage

```
/todo add "Fix hero animation on mobile"
/todo add "Add Arabic RTL support to footer" tomorrow
/todo complete 1
/todo remove 2
/todo list
/todo next
/todo past-due
/todo undo 3
```

## Instructions

1. Find or create `todos.md` in the project root
2. Parse the command argument to determine action:
   - `add "task"` — add to Active list
   - `add "task" [tomorrow|next week|MM-DD-YYYY]` — add with due date
   - `complete N` — mark done, move to Completed
   - `remove N` — delete entirely
   - `undo N` — move back to Active
   - `list` or no args — show all todos numbered
   - `next` — show next priority task (respects due dates)
   - `past-due` — show overdue active tasks

## todos.md Format

```markdown
# Project Todos

## Active
- [ ] Task description | Due: MM-DD-YYYY
- [ ] Another task

## Completed
- [x] Done task | Done: MM-DD-YYYY
```

## Behaviour Rules

- Sort Active list: tasks with due dates first (ascending), then undated tasks
- Always confirm action with a short success message
- If todos.md doesn't exist, create it with the basic structure
- Never silently fail — report any errors clearly
