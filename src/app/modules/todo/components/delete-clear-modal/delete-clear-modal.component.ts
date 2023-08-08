import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Subject } from 'rxjs';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-delete-clear-modal',
  templateUrl: './delete-clear-modal.component.html',
  styleUrls: ['./delete-clear-modal.component.scss']
})
export class DeleteClearModalComponent {
  private unsubcribe$ = new Subject<void>();
  public showDeleteClearModal: boolean = false;
  public isDelete: boolean = false;
  public isClear: boolean = false;
  public todoClearCompleted!: ITodo[];

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.openDeleteClearModal$.subscribe((value) => {
      this.showDeleteClearModal = value;
    })
    this.todoService.isDelete$.subscribe((value) => {
      this.isDelete = value;
    })
    this.todoService.isClear$.subscribe((value) => {
      this.isClear = value;
    })
  }

  closeModal(){
    this.showDeleteClearModal = false;
    this.todoService.setCloseDeleteClearModal();
  }

  public todo!: ITodo;
  deleteTodo(){
    console.log('Khởi chạy chức năng Delete');
    this.todoService.todo_$.subscribe((value) => {
      this.todo = value;
    })
    console.log('todo bị delete: ', this.todo);
    this.todoService.deleteTodo(this.todo);
    this.closeModal();
    this.todoService.setOpenDeleteToast();
  }

  clearCompletedTodos(){
    console.log('Khởi chạy chức năng Clear');
    this.todoService.todos$.subscribe((value) => {
      this.todoClearCompleted = value.filter(todo => todo.isCompleted);
    })
    for(const todo of this.todoClearCompleted){
      this.todoService.deleteTodo(todo);
    }
    this.closeModal();
    this.todoService.setOpenClearToast();
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
