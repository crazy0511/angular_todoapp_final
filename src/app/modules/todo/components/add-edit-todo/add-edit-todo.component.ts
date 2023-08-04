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
  
  // Truyền giá trị vào cho clickAdd = true
  clickedButtonAdd(){
    this.todoService.setClickAdd();
  }

  // Truyền giá trị vào cho clickUpdate = true
  clickedButtonUpdate(){
    this.todoService.setClickUpdate();
  }

  constructor(private todoService: TodoService){}
}
