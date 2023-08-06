import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit, OnDestroy{
  private unsubcribe$ = new Subject<void>();
  
  public isAdd: boolean = false;
  public isUpdate: boolean = false;
  public showModal: boolean = false;

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.openAddEditModal$.subscribe((value) => {
      this.showModal = value;
    })
  }

  closeModal(){
    this.showModal = false;
    this.todoService.setCloseAddEditModal();
  }

  // Tạo formValue kiểu dữ liệu FromGroup
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

  // So sánh thời gian nhập với thời gian hiện tại
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

  clickAddTodo() {
    this.formValue.reset();
    this.isAdd = true;
    this.isUpdate = false;
  }

  clickUpdateTodo() {
    this.isAdd = false;
    this.isUpdate = true;
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
