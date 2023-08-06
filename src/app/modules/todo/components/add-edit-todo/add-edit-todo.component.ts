import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent {
  @Input() isAdd!: boolean;
  @Input() isUpdate!: boolean;

  constructor(private todoService: TodoService){}
  
  clickedButtonAdd(){
    this.todoService.setClickAddEditModal();
  }
  clickedButtonUpdate(){
    this.todoService.setClickAddEditModal();
  }
}
