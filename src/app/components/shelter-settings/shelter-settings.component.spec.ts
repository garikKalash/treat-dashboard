import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterSettingsComponent } from './shelter-settings.component';

describe('ShelterSettingsComponent', () => {
  let component: ShelterSettingsComponent;
  let fixture: ComponentFixture<ShelterSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelterSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
