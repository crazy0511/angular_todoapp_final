import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trudi-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trudi-toast.component.html',
  styleUrls: ['./trudi-toast.component.scss']
})
export class TrudiToastComponent {
  @Input() title!: string;
  @Input() tilteRole!: string;
  @Input() message!: string;
  @Input() linkIcon!: string;
  @Input() nameIcon!: string;
  @Input() icon!: string;
  @Input() toastRole!: string;
  @Input() toastIcon!: string;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();
  
  handleClick() {
    this.clickEvent.emit();
  }
}