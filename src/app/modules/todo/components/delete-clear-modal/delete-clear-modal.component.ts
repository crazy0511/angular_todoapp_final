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
  public showModal: boolean = false;
  public isDelete: boolean = false;
  public isClear: boolean = false;
  public todo!: ITodo;

  constructor(private todoService: TodoService){
  }

  ngOnInit(): void {
    this.todoService.openDeleteClearModal$.subscribe((value) => {
      this.showModal = value;
    })
    this.todoService.isDelete$.subscribe((value) => {
      this.isDelete = value;
    })
    this.todoService.isClear$.subscribe((value) => {
      this.isClear = value;
    })
  }

  closeModal(){
    this.showModal = false;
    this.todoService.setCloseDeleteClear();
  }

  deleteTodo(){
    this.showModal = false;
    this.todoService.setCloseDeleteClear();
    this.todoService.todo_$.subscribe((value) => {
      this.todo = value;
      this.todoService.deleteTodo(this.todo);
    })
    this.closeModal();
  }

  clearCompletedTodos(){}

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
