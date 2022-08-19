import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoExceptionsComponent } from './info-exceptions.component';

describe('InfoExceptionsComponent', () => {
  let component: InfoExceptionsComponent;
  let fixture: ComponentFixture<InfoExceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoExceptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
