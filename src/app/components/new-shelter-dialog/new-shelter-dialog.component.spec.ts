import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShelterDialogComponent } from './new-shelter-dialog.component';

describe('NewShelterDialogComponent', () => {
  let component: NewShelterDialogComponent;
  let fixture: ComponentFixture<NewShelterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewShelterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewShelterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
