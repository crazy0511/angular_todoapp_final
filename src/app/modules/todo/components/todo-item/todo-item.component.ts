import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit{
  @Input() todo!: ITodo;
  @Output() changeIsCompleted: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() editTodo: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() deleteTodo: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  ngOnInit(){
    console.log('todo trong todo-item: ', this.todo);
  }
}
