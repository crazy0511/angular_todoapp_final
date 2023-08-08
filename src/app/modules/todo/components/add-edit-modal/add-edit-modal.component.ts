import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Subject, takeUntil } from 'rxjs';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit, OnDestroy{
  private unsubcribe$ = new Subject<void>();
  public showAddEditModal: boolean = false;
  public isAdd: boolean = false;
  public isUpdate: boolean = false;
  public todo!: ITodo;
  public getTodo: ITodo = {
    id: 1,
    title: '',
    deadline: '',
    content: '',
    isCompleted: false,
    status: '',
  };

  constructor(private todoService: TodoService){
    this.todo = {
      id: 1,
      title: '',
      deadline: '',
      content: '',
      isCompleted: false,
      status: 'Active'
    };
  }

  ngOnInit(): void {
    this.todoService.openAddEditModal$.subscribe((value) => {
      this.showAddEditModal = value;
    })
    this.todoService.isAdd$.subscribe((value) => {
      this.isAdd = value;
    })
    this.todoService.isUpdate$.subscribe((value) => {
      this.isUpdate = value;
    })
    this.todoService.todo_$.subscribe((value) => {
      this.getTodo = value;
      this.formValue.get('title')?.setValue(this.getTodo.title);
      this.formValue.get('deadline')?.setValue(this.getTodo.deadline);
      this.formValue.get('content')?.setValue(this.getTodo.content);
    })
  }

  closeModal(){
    this.showAddEditModal = false;
    this.todoService.setCloseAddEditModal();
    this.formValue.reset();
  }

  formValue = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    deadline: new FormControl('', [
      Validators.required,
      this.compareCurrentTime,
    ]),
    content: new FormControl('', [
      Validators.required,
    ]),
  });

  compareCurrentTime(control: AbstractControl) {
    const inputTime = new Date(control.value);
    const currentTime = new Date();
    if(inputTime.getTime() - currentTime.getTime() < 0){
      return {
        timeError: true,
      };
    }
    return null;
  }

  get getTitle(){
    return this.formValue.get('title');
  }
  get getDeadline(){
    return this.formValue.get('deadline');
  }
  get getContent(){
    return this.formValue.get('content');
  }

  postTodoDetails() {
    console.log('Khởi chạy chức năng Add');
    this.todo.id = new Date(Date.now()).getTime();
    if(this.formValue.value.title != null){
      this.todo.title = this.formValue.value.title; 
    }
    if(this.formValue.value.deadline != null){
      this.todo.deadline = this.formValue.value.deadline;
    }
    if(this.formValue.value.content != null){
      this.todo.content = this.formValue.value.content;
    }
    this.statusValue(this.todo);

    if(this.todo.title.trim() != '' && this.todo.deadline.trim() != '' && this.todo.content.trim() != ''){
      console.log('todo add = ', this.todo);
      this.todoService.addTodo(this.todo);
    }
    this.closeModal();
    this.todoService.setOpenAddToast();
  }

  updateTodoDetails() {
    console.log('Khởi chạy chức năng Edit');
    this.todo.id = this.getTodo.id;
    if(this.formValue.value.title != null){
      this.todo.title = this.formValue.value.title;
    }
    if(this.formValue.value.deadline != null){
      this.todo.deadline = this.formValue.value.deadline;
    }
    if(this.formValue.value.content != null){
      this.todo.content = this.formValue.value.content;
    }
    this.statusValue(this.todo);

    if(this.todo.title.trim() != '' && this.todo.deadline.trim() != '' && this.todo.content.trim() != ''){
      console.log('todo update = ', this.todo);
      this.todoService.updateTodo(this.todo);
    }
    this.closeModal();
    this.todoService.setOpenUpdateToast();
  }

  statusValue(todo: ITodo){
    const differenceTime = (new Date(todo.deadline)).getTime() - (new Date()).getTime();
    const oneHour = 60 * 60 * 1000;
    if(todo.isCompleted == true){
      todo.status = 'Completed';
    }
    else{
      if(differenceTime > 0 && differenceTime < oneHour){
        todo.status = 'Near the deadline';
      }
      else {
        if(differenceTime <= 0){
          todo.status = 'Overdue';
        }
        else{
          todo.status = 'Active';
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
