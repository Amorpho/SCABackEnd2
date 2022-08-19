import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExceptionsComponent } from './edit-exceptions.component';

describe('EditExceptionsComponent', () => {
  let component: EditExceptionsComponent;
  let fixture: ComponentFixture<EditExceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExceptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
