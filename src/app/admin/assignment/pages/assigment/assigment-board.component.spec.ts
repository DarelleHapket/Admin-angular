import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentBoardComponent } from './assigment-board.component';
describe('AssigmentBoardComponent', () => {
  let component: AssigmentBoardComponent;
  let fixture: ComponentFixture<AssigmentBoardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigmentBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssigmentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
