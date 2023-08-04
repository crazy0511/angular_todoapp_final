import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trudi-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trudi-button.component.html',
  styleUrls: ['./trudi-button.component.scss']
})
export class TrudiButtonComponent {
  @Input() buttonName!: string;
  @Input() isClick!: boolean;
}
