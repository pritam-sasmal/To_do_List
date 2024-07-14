import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Todo } from '../../Todo'; // Adjust the path based on your structure
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoDelete:EventEmitter<Todo>=new EventEmitter();
  @Output() todoCheckbox:EventEmitter<Todo>=new EventEmitter();
  @Output() todoEdit:EventEmitter<Todo>=new EventEmitter();
  @Output() todoHistory: EventEmitter<Todo> = new EventEmitter();
  
  onClickdelete(todo:Todo){
    this.todoDelete.emit(todo);
    console.log("clicked delete button");
  }
  onCheckboxClick(todo:Todo){
    this.todoCheckbox.emit(todo);
  }
  onClickEdit(todo:Todo){
    this.todoEdit.emit(todo);
  }
  onClickhistory(todo: Todo) {
    this.todoHistory.emit(todo);
  }
}
