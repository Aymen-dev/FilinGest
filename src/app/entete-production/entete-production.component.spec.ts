import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteProductionComponent } from './entete-production.component';

describe('EnteteProductionComponent', () => {
  let component: EnteteProductionComponent;
  let fixture: ComponentFixture<EnteteProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnteteProductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnteteProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
