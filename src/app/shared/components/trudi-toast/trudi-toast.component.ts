import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trudi-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trudi-toast.component.html',
  styleUrls: ['./trudi-toast.component.scss']
})
export class TrudiToastComponent implements OnInit{
  ngOnInit(): void{
    console.log('Có chạy toast');
  }
}
