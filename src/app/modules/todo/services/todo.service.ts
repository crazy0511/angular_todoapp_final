import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ITodo } from '../models/todo.model';
import { BehaviorSubject, Observable, filter } from 'rxjs';
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

  private allLength = new BehaviorSubject<number>(0);
  allLength$ = this.allLength.asObservable();
  private currentLength = new BehaviorSubject<number>(0);
  currentLength$ = this.currentLength.asObservable();
  private completedLength = new BehaviorSubject<number>(0);
  completedLength$ = this.completedLength.asObservable();
  private nameStatus = new BehaviorSubject<string>('active');
  nameStatus$ = this.nameStatus.asObservable();

  private todo_start: ITodo = {
    id: 1,
    title: '',
    deadline: '',
    content: '',
    isCompleted: false,
    status: '',
  } 
  private todo_ = new BehaviorSubject<ITodo>(this.todo_start);
  todo_$ = this.todo_.asObservable();
  setTodo(todo: ITodo){
    this.todo_.next(todo);
  }

  private isAdd = new BehaviorSubject<boolean>(false);
  isAdd$ = this.isAdd.asObservable();
  setIsAddTrue() {
    this.isAdd.next(true);
  }
  setIsAddFalse() {
    this.isAdd.next(false);
  }
  
  private isUpdate = new BehaviorSubject<boolean>(false);
  isUpdate$ = this.isUpdate.asObservable();
  setIsUpdateTrue() {
    this.isUpdate.next(true);
  }
  setIsUpdateFalse() {
    this.isUpdate.next(false);
  }

  private isDelete = new BehaviorSubject<boolean>(false);
  isDelete$ = this.isDelete.asObservable();
  setIsDeleteTrue() {
    this.isDelete.next(true);
  }
  setIsDeleteFalse() {
    this.isDelete.next(false);
  }

  private isClear = new BehaviorSubject<boolean>(false);
  isClear$ = this.isClear.asObservable();
  setIsClearTrue() {
    this.isClear.next(true);
  }
  setIsClearFalse() {
    this.isClear.next(false);
  }

  private openAddEditModal = new BehaviorSubject<boolean>(false);
  openAddEditModal$ = this.openAddEditModal.asObservable();
  setOpenAddEditModal(){
    this.openAddEditModal.next(true);
  }
  setCloseAddEditModal(){
    this.openAddEditModal.next(false);
  }

  private openDeleteClearModal = new BehaviorSubject<boolean>(false);
  openDeleteClearModal$ = this.openDeleteClearModal.asObservable();
  setOpenDeleteClearModal(){
    this.openDeleteClearModal.next(true);
  }
  setCloseDeleteClearModal(){
    this.openDeleteClearModal.next(false);
  }

  constructor(private api: ApiService) {
    this.todo = {
      id: 1,
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
      this.allLength.next(this.todos.length);
      this.currentLength.next(this.todos.filter(todo => !todo.isCompleted).length);
      this.completedLength.next(this.todos.filter(todo => todo.isCompleted).length);
    });
  }

  updateTodosShow(){
    this.displayTodosSubject.next(this.filterTodos);
    this.lengthSubject.next(this.todos.length);
  }

  filterTodo(filter: EFilter){
    this.currentFilter = filter;
    switch(this.currentFilter){
      case EFilter.Active:
        this.filterTodos = this.todos.filter(todo => !todo.isCompleted);
        this.currentLength.next(this.filterTodos.length);
        this.nameStatus.next('active');
        break;
      case EFilter.Completed:
        this.filterTodos = this.todos.filter(todo => todo.isCompleted);
        this.currentLength.next(this.filterTodos.length);
        this.nameStatus.next('completed');
        break;
      case EFilter.All:
        this.filterTodos = [...this.todos];
        this.currentLength.next(this.todos.filter(todo => !todo.isCompleted).length);
        this.nameStatus.next('active');
        break;
      default: 
        this.filterTodos = [...this.todos];
        this.currentLength.next(this.todos.filter(todo => !todo.isCompleted).length);
        this.nameStatus.next('active');
    } 
    this.updateTodosShow();
  }

  changeStatus(){
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
        else{
          todo.status = 'Active';
        }
      } else todo.status = 'Completed';
      this.api.updateTodo(todo, todo.id);
      this.api.getTodos();
    }
  }

  addTodo(todo: ITodo){
    this.todo = todo;
    if(this.todo.title.trim() != '' && this.todo.deadline.trim() != '' && this.todo.content.trim() != ''){
      this.api.postTodo(this.todo).subscribe({
        next: () => {
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
    this.api.updateTodo(this.todo, this.todo.id).subscribe({
      next: () => {
        this.getTodosFromApiService();
      },
      error: () => {
        alert('Something went wrong');
      },
    });
  }

  deleteTodo(todo: ITodo){
    this.todo = todo;
    console.log('todo = ', this.todo);
    this.api.deleteTodo(this.todo.id).subscribe({
      next: () => {
        this.getTodosFromApiService();
      },
      error: () => {
        alert('Something went wrong');
      }
    });
  }
}
