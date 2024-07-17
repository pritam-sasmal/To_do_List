import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../Todo'; // Adjust the path based on your structure
import { TodoItemComponent } from '../todo-item/todo-item.component'; // Correct import
import { AddTodoComponent } from '../add-todo/add-todo.component'; // Correct import
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, AddTodoComponent, FormsModule], // Ensure TodoItemComponent is imported
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  editingTodo: Todo | null = null;
  editTitle: string = '';
  editDesc: string = '';
  editPriority: string = '';
  editDate: string = '';
  selectedTodo: Todo | null = null;

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const localTodos = localStorage.getItem('todos');
      this.todos = localTodos ? JSON.parse(localTodos) : [];
    } else {
      this.todos = []; // Fallback if localStorage is not available
    }
  }

  ngOnInit() {
    
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    this.saveToLocalStorage();
  }

  addtodo(todo: Todo) {
    this.todos.push(todo);
    this.saveToLocalStorage();
  }

  toggletodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].status = !this.todos[index].status;
    const statusAction = this.todos[index].status ? 'Marked as In-progress' : 'Marked as Completed';
    todo.addHistory(statusAction);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  editTodo(todo: Todo) {
    this.editingTodo = todo;
    this.editTitle = todo.title;
    this.editDesc = todo.desc;
    this.editPriority = todo.priority;
    this.editDate = todo.dueDate;
  }

  saveEdit() {
    if (this.editingTodo) {
      const index = this.todos.indexOf(this.editingTodo);
      this.todos[index].title = this.editTitle;
      this.todos[index].desc = this.editDesc;
      this.todos[index].priority = this.editPriority;
      this.todos[index].dueDate = this.editDate;
      this.editingTodo.addHistory('Edited');
      this.saveToLocalStorage();
      this.editingTodo = null;
      this.editTitle = '';
      this.editDesc = '';
      this.editPriority = '';
      this.editDate = '';
    }
  }

  cancelEdit() {
    this.editingTodo = null;
    this.editTitle = '';
    this.editDesc = '';
    this.editPriority = '';
    this.editDate = '';
  }

  viewHistory(todo: Todo) {
    this.selectedTodo = todo;
  }

  closeHistory() {
    this.selectedTodo = null;
  }

  exportToCSV() {
    if (this.todos.length === 0) {
      console.warn('No todos to export.');
      return;
    }

    const csvHeader = 'Title,Description,Due Date,Status\n';
    const csvData = this.todos.map(todo => {
      const statusLabel = todo.status ? 'In Progress' : 'Completed';
      return `${todo.title},${todo.desc},${todo.dueDate},${statusLabel}\n`;
    }).join('');

    const csvBlob = new Blob([csvHeader, csvData], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = 'todos.csv';
    link.click();

    URL.revokeObjectURL(csvUrl);
  }
}