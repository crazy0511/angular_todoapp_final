import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';

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

  onSetAdd() {
    this.todoService.setIsAddTrue();
    this.todoService.setIsUpdateFalse();
  }

}
