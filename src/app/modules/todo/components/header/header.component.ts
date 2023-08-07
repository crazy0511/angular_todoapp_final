import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isAdd: boolean = true;
  public isUpdate: boolean = false;
  
  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.getTodosFromApiService();
  }

  setAdd() {
    this.todoService.setIsAddTrue();
    this.todoService.setIsUpdateFalse();
  }

}
