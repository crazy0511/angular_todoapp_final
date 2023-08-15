import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EFilter, IFilterButton } from '../../models/filter.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-filter-todo',
  templateUrl: './filter-todo.component.html',
  styleUrls: ['./filter-todo.component.scss']
})
export class FilterTodoComponent {
  public filterButtons: IFilterButton[] = [
    {type: EFilter.All, label: 'all', isActive: false},
    {type: EFilter.Active, label: 'active', isActive: false},
    {type: EFilter.Completed, label: 'completed', isActive: false},
  ];
  
  constructor(private todoService: TodoService){}

  filter(type: EFilter){
    this.setActiveFilterBtn(type);
    this.todoService.filterTodo(type);
  }
  
  private setActiveFilterBtn(type: EFilter){
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    });
  }
}
