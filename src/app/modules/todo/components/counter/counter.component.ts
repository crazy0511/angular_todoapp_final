import { Component, Input, OnInit } from '@angular/core';
import { TodoComponent } from '../../todo.component';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  public allCount!: number;
  public currentCount!: number;
  public nameStatus!: string;
  
  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.allLength$.subscribe(allLength => {
      this.allCount = allLength;
    }) 
    this.todoService.currentLength$.subscribe(currentLength => {
      this.currentCount = currentLength;
    }) 
    this.todoService.nameStatus$.subscribe(nameStatus => {
      this.nameStatus = nameStatus;
    }) 
  }
}
