import { Component, Input} from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent{
  @Input() todo!: ITodo;

  constructor(private todoService: TodoService){}

  public newTodo!: ITodo; 
  changeIsCompleted(isCompleted: boolean){
    this.todo.isCompleted = isCompleted;
    this.newTodo = {...this.todo};
    this.todoService.changeStatus();
    if(this.newTodo.id != null){
      this.todoService.updateTodo(this.newTodo);
    }
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
