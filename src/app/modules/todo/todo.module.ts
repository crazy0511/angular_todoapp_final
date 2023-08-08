import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TodoComponent } from './todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TrudiCheckboxComponent } from 'src/app/shared/components/trudi-checkbox/trudi-checkbox.component';
import { TrudiButtonComponent } from 'src/app/shared/components/trudi-button/trudi-button.component';
import { FilterTodoComponent } from './components/filter-todo/filter-todo.component';
import { FooterComponent } from './components/footer/footer.component';
import { CounterComponent } from './components/counter/counter.component';
import { AddEditTodoComponent } from './components/add-edit-todo/add-edit-todo.component';
import { AddEditModalComponent } from './components/add-edit-modal/add-edit-modal.component';
import { DeleteClearModalComponent } from './components/delete-clear-modal/delete-clear-modal.component';
import { TrudiTextFieldComponent } from 'src/app/shared/components/trudi-text-field/trudi-text-field.component';
import { TrudiDatePickerComponent } from 'src/app/shared/components/trudi-date-picker/trudi-date-picker.component';
import { DeleteClearTodoComponent } from './components/delete-clear-todo/delete-clear-todo.component';
import { TrudiToastComponent } from 'src/app/shared/components/trudi-toast/trudi-toast.component';

@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent,
    TodoListComponent,
    TodoItemComponent,
    FilterTodoComponent,
    FooterComponent,
    CounterComponent,
    AddEditTodoComponent,
    AddEditModalComponent,
    DeleteClearModalComponent,
    DeleteClearTodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, 
    TrudiCheckboxComponent,
    TrudiButtonComponent,
    TrudiTextFieldComponent,
    TrudiDatePickerComponent,
    TrudiToastComponent,
  ],
  exports: [
    TodoComponent,
  ]
})
export class TodoModule { }
