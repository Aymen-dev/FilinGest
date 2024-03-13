import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMachinesComponent } from './liste-machines.component';

describe('ListeMachinesComponent', () => {
  let component: ListeMachinesComponent;
  let fixture: ComponentFixture<ListeMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeMachinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
