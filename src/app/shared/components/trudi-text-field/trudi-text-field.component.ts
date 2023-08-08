import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trudi-text-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trudi-text-field.component.html',
  styleUrls: ['./trudi-text-field.component.scss'],
})
export class TrudiTextFieldComponent {
  @Input() formControl!: FormControl;
  @Input() name!: string;
}
