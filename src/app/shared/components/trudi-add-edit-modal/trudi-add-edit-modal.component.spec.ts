import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrudiAddEditModalComponent } from './trudi-add-edit-modal.component';

describe('TrudiAddEditModalComponent', () => {
  let component: TrudiAddEditModalComponent;
  let fixture: ComponentFixture<TrudiAddEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrudiAddEditModalComponent]
    });
    fixture = TestBed.createComponent(TrudiAddEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
