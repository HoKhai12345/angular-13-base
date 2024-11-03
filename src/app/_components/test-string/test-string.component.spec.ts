import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStringComponent } from './test-string.component';

describe('TestStringComponent', () => {
  let component: TestStringComponent;
  let fixture: ComponentFixture<TestStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestStringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
