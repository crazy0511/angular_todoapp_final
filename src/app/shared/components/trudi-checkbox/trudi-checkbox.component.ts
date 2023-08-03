import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trudi-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trudi-checkbox.component.html',
  styleUrls: ['./trudi-checkbox.component.scss']
})
export class TrudiCheckboxComponent {  
  @Input() id!: number | undefined;
  @Input() isCompleted!: boolean;

  @Output() __changeIsCompleted: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  private newIsCompledted: boolean = false;
  changeChecked(){
    this.newIsCompledted = !this.isCompleted;
    this.__changeIsCompleted.emit(this.newIsCompledted);
    // console.log('newIsCompleted: ', this.newIsCompledted);
  }
}
