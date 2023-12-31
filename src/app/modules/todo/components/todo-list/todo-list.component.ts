import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos$!: Observable<ITodo[]>;

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.getTodosFromApiService();
    this.todos$ = this.todoService.todos$;
  }
}
