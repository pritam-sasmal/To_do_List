import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include CommonModule and FormsModule in imports
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'] // Fix styleUrls
})
export class AddTodoComponent {
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter(); // Rename to todoAdd
  title!: string;
  desc!: string;
  dueDate!:string;
  onSubmit() {
    const todo = new Todo(this.title, this.desc, this.dueDate, true); // Use the constructor
    console.log(todo.dueDate);
    this.todoAdd.emit(todo); // Emit the new todo
  }
}
