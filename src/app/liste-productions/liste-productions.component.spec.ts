import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProductionsComponent } from './liste-productions.component';

describe('ListeProductionsComponent', () => {
  let component: ListeProductionsComponent;
  let fixture: ComponentFixture<ListeProductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeProductionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeProductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
