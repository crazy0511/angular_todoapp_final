import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-delete-clear-todo',
  templateUrl: './delete-clear-todo.component.html',
  styleUrls: ['./delete-clear-todo.component.scss']
})
export class DeleteClearTodoComponent {
  @Input() isDelete!: boolean;
  @Input() isClear!: boolean;

  constructor(private todoService: TodoService){}
  
  clickedButton(){
    console.log('sau khi click mở modal delete clear');
    this.todoService.setOpenDeleteClearModal();
  }
}
