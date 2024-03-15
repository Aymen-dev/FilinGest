import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDynamiqueComponent } from './ajout-dynamique.component';

describe('AjoutDynamiqueComponent', () => {
  let component: AjoutDynamiqueComponent;
  let fixture: ComponentFixture<AjoutDynamiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutDynamiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutDynamiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
