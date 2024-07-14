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
export class TodoComponent {
  todos!: Todo[];
  localitem: string | null | undefined;
  editingTodo: Todo | null = null;
  editTitle: string = '';
  editDesc: string = '';
  editDate: string = '';
  selectedTodo: Todo | null = null;

  constructor() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.localitem = localStorage.getItem("todos");
      if (this.localitem == null) {
        this.todos = [];
      } else {
        this.todos = JSON.parse(this.localitem);
      }
    } else {
      this.todos = [];
    }
  }

  deleteTodo(todo: Todo) {
    console.log(todo);
    const index = this.todos.indexOf(todo);
    //todo.addHistory('Deleted');
    this.todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addtodo(todo: Todo) {
    console.log(todo);
    todo.addHistory('Added');
    this.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  toggletodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].status = !this.todos[index].status;
    todo.addHistory(this.todos[index].status ? 'Marked as In-progress' : 'Marked as Completed');
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  editTodo(todo: Todo) {
    this.editingTodo = todo;
    this.editTitle = todo.title;
    this.editDesc = todo.desc;
    this.editDate = todo.dueDate;
  }

  saveEdit(todo: Todo) {
    if (this.editingTodo) {
      this.editingTodo.title = this.editTitle;
      this.editingTodo.desc = this.editDesc;
      this.editingTodo.dueDate = this.editDate;
      this.editingTodo.addHistory('Edited');
      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.editingTodo = null;
      this.editTitle = '';
      this.editDesc = '';
      this.editDate = '';
    }
  }

  cancelEdit() {
    this.editingTodo = null;
    this.editTitle = '';
    this.editDesc = '';
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
      const statusLabel = todo.status == false ? 'Completed' : 'In Progress'; // Convert boolean to string
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
