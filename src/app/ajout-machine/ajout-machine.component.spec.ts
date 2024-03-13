import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMachineComponent } from './ajout-machine.component';

describe('AjoutMachineComponent', () => {
  let component: AjoutMachineComponent;
  let fixture: ComponentFixture<AjoutMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
