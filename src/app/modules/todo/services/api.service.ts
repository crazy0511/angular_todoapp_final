import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  postTodo(todo: ITodo) {
    return this.http.post<ITodo>('http://localhost:3000/todos', todo).pipe(
      map((res: ITodo) => {
        return res;
      })
    );
  }
  
  getTodos() {
    return this.http.get<ITodo[]>('http://localhost:3000/todos').pipe(
      map((res: ITodo[]) => {
        return res;
      })
    );
  }

  updateTodo(todo: ITodo, id: number) {
    return this.http.put<ITodo>('http://localhost:3000/todos/' + id, todo).pipe(
      map((res: ITodo) => {
        return res;
      })
    );
  }
  
  deleteTodo(id: number) {
    return this.http.delete<ITodo>('http://localhost:3000/todos/' + id).pipe(
      map((res: ITodo) => {
        return res;
      })
    );
  }
}
