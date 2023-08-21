import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterDataComponent } from './shelter-data.component';

describe('ShelterDataComponent', () => {
  let component: ShelterDataComponent;
  let fixture: ComponentFixture<ShelterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelterDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
