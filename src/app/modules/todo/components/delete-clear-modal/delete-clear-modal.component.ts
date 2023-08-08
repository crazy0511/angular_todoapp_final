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
  
  public isDeleteToast: boolean = false;
  public isClearToast: boolean = false;

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

  deleteTodo(){
    this.todoService.todo_$.subscribe((value) => {
      this.todoService.deleteTodo(value);
    })
    this.closeModal();
  }


  clearCompletedTodos(){
    this.todoService.todo$.subscribe((value) => {
      this.todoClearCompleted = value.filter(todo => todo.isCompleted);
    })
    for(const todo of this.todoClearCompleted){
      this.todoService.deleteTodo(todo);
    }
    this.todoService.getTodosFromApiService();
    this.closeModal();
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
