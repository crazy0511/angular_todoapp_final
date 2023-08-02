import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ITodo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { EFilter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todo!: ITodo;
  private todos!: ITodo[];

  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);

  private filterTodos!: ITodo[];
  private currentFilter!: EFilter;

  public todo$: Observable<ITodo[]> = this.displayTodosSubject.asObservable();
  public length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private api: ApiService) {
    this.todo = {
      title: '',
      deadline: '',
      content: '',
      isCompleted: false,
      status: 'Active'
    };
  }

  getTodosFromApiService(){
    this.api.getTodos().subscribe((res) => {
      this.todos = res;
      this.changeStatus();
      this.filterTodos = [...this.todos];
      this.updateTodosShow();
    });
  }

  private updateTodosShow(){
    this.displayTodosSubject.next(this.filterTodos);
    this.lengthSubject.next(this.todos.length);
  }

  private changeStatus(){
    for(const todo of this.todos){
      const currentTime = new Date();
      const deadlineTime = new Date(todo.deadline);
      const differenceTime = deadlineTime.getTime() - currentTime.getTime();
      const oneHour = 60 * 60 * 1000;
      if(todo.isCompleted != true){
        if(differenceTime < oneHour && differenceTime > 0){
          todo.status = 'Near the deadline';
        }
        else if(differenceTime <= 0){
          todo.status = 'Overdue';
        }
      } else todo.status = 'Completed';
      if(todo.id != null){
        this.api.updateTodo(todo, todo.id);
      }
      this.api.getTodos();
    }
  }


  addTodo(todo: ITodo){
    this.todo = todo;
    if(this.todo.title.trim() != '' && this.todo.deadline.trim() != '' && this.todo.content.trim() != ''){
      this.api.postTodo(this.todo).subscribe({
        next: () => {
          const ref = document.getElementById('cancel');
          ref?.click();
          this.getTodosFromApiService();
        },
        error: () => {
          alert('Something went wrong');
        },
      });
    }
  }

  updateTodo(todo: ITodo){
    this.todo = todo;
    if(this.todo.id == null){
      return;
    }
    if(this.todo.title.trim() != '' && this.todo.deadline.trim() != '' && this.todo.content.trim() != ''){
      this.api.updateTodo(this.todo, this.todo.id).subscribe({
        next: () => {
          const ref = document.getElementById('cancel');
          ref?.click();
          this.getTodosFromApiService();
        },
        error: () => {
          alert('Something went wrong');
        },
      });
    }
  }

  deleteTodo(todo: ITodo){
    this.todo = todo;
    if(this.todo.id == null){
      return;
    }
    this.api.deleteTodo(this.todo.id).subscribe({
      next: () => {
        const ref = document.getElementById('deleteCancel');
        ref?.click();
        this.getTodosFromApiService();
      },
      error: () => {
        alert('Something went wrong');
      }
    });
  }
}
