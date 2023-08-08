import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trudi-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trudi-toast.component.html',
  styleUrls: ['./trudi-toast.component.scss']
})
export class TrudiToastComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() iconName!: string;
  @Input() toastRole!: string;
  @Input() toastIcon!: string;
}
