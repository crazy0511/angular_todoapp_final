import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trudi-text-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trudi-text-field.component.html',
  styleUrls: ['./trudi-text-field.component.scss'],
})
export class TrudiTextFieldComponent {
  @Input() formControl!: FormControl;
}
