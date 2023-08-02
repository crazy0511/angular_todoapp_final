import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TrudiButtonComponent } from 'src/app/shared/components/trudi-button/trudi-button.component';
import { TodoComponent } from './todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent,
    TodoListComponent,
    TodoItemComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, 
  ],
  exports: [
    TodoComponent,
  ]
})
export class TodoModule { }
