import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsProductionComponent } from './view-details-production.component';

describe('ViewDetailsProductionComponent', () => {
  let component: ViewDetailsProductionComponent;
  let fixture: ComponentFixture<ViewDetailsProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDetailsProductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDetailsProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
