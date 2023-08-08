import { Component, Input, OnInit} from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent{
  public isAdd: boolean = false;
  public isUpdate: boolean = true;
  public isDelete: boolean = true;
  public isClear: boolean = false;

  @Input() todo!: ITodo;

  constructor(private todoService: TodoService){}

  setUpdate() {
    this.todoService.setIsAddFalse();
    this.todoService.setIsUpdateTrue();
    this.todoService.setTodo(this.todo);
  }

  setDelete(){
    this.todoService.setIsDeleteTrue();
    this.todoService.setIsClearFalse();
    this.todoService.setTodo(this.todo);
  }
  
  public newTodo!: ITodo; 
  changeIsCompleted(isCompleted: boolean){
    this.todo.isCompleted = isCompleted;
    this.newTodo = {...this.todo};
    this.todoService.changeStatus();
    this.todoService.updateTodo(this.newTodo);
  }

  getColorStatus(status: string): string{
    switch (status) {
    case 'Active':
      return 'gray';
    case 'Completed':
      return 'green';
    case 'Overdue':
      return 'red';
    case 'Near the deadline':
      return 'orange';
    default:
      return 'black';
    }
  }
}
