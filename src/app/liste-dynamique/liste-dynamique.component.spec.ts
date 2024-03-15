import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDynamiqueComponent } from './liste-dynamique.component';

describe('ListeDynamiqueComponent', () => {
  let component: ListeDynamiqueComponent;
  let fixture: ComponentFixture<ListeDynamiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeDynamiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeDynamiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
