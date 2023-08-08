import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  public isDelete: boolean = false;
  public isClear: boolean = true;
  public hasCompleted: boolean = false;

  constructor(private todoService: TodoService){}

  ngOnInit(): void{
    this.todoService.completedLength$.subscribe((length) => {
      if(length > 0){
        this.hasCompleted = true;
      }
      else{
        this.hasCompleted = false;
      }
    })
  }

  setClear(){
    this.todoService.setIsDeleteFalse();
    this.todoService.setIsClearTrue();
  }
}
