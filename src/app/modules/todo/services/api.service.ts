import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }
  link: string = 'https://64dae06e593f57e435b03b62.mockapi.io/api/todos/';
  postTodo(todo: ITodo) {
    return this.http.post<ITodo>(this.link, todo).pipe(
      map((res: ITodo) => {
        return res;
      })
    );
  }
  
  getTodos() {
    return this.http.get<ITodo[]>(this.link).pipe(
      map((res: ITodo[]) => {
        return res;
      })
    );
  }

  updateTodo(todo: ITodo, id: number) {
    return this.http.put<ITodo>(this.link + id, todo).pipe(
      map((res: ITodo) => {
        return res;
      })
    );
  }
  
  deleteTodo(id: number) {
    return this.http.delete<ITodo>(this.link + id).pipe(
      map((res: ITodo) => {
        return res;
      })
    );
  }
}
