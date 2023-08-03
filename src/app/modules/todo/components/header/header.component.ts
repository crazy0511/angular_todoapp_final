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
  public todos$!: Observable<ITodo[]>;

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.getTodosFromApiService();
    this.todos$ = this.todoService.todo$;
    // this.todos$.subscribe(todo => console.log("todo: ", todo));
  }

}
