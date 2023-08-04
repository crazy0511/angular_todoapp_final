import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  public openAddEditModal: boolean = true;
  public openDeleteClearModal: boolean = false;

  constructor(private todoService: TodoService){}

  ngOnInit(): void{
    // this.todoService.openAddEditModal$.subscribe((value) => {
    //   this.openAddEditModal = value;
    // })
  }
}
