import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trudi-date-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trudi-date-picker.component.html',
  styleUrls: ['./trudi-date-picker.component.scss']
})
export class TrudiDatePickerComponent {
  @Input() formControl!: FormControl;
}
