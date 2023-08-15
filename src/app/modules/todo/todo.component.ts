import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  public isAddToast: boolean = false;
  public isUpdateToast: boolean = false;
  public isDeleteToast: boolean = false;
  public isClearToast: boolean = false;

  constructor(private todoService: TodoService){
    this.todoService.openAddToast$.subscribe((value) => {
      this.isAddToast = value;
    });
    this.todoService.openUpdateToast$.subscribe((value) => {
      this.isUpdateToast = value;
    });
    this.todoService.openDeleteToast$.subscribe((value) => {
      this.isDeleteToast = value;
    });
    this.todoService.openClearToast$.subscribe((value) => {
      this.isClearToast = value;
    });
  }

  closeToast(){
    if(this.isAddToast == true){
      this.isAddToast = false;
      this.todoService.setCloseAddToast();
    }
    if(this.isUpdateToast == true){
      this.isUpdateToast = false;
      this.todoService.setCloseUpdateToast();
    }
    if(this.isDeleteToast == true){
      this.isDeleteToast = false;
      this.todoService.setCloseDeleteToast();
    }
    if(this.isClearToast == true){
      this.isClearToast = false;
      this.todoService.setCloseClearToast();
    }
  }

}
