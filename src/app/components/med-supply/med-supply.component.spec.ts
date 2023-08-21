import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedSupplyComponent } from './med-supply.component';

describe('MedSupplyComponent', () => {
  let component: MedSupplyComponent;
  let fixture: ComponentFixture<MedSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
