import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestColumnComponent } from './test-column.component';

describe('TestColumnComponent', () => {
  let component: TestColumnComponent;
  let fixture: ComponentFixture<TestColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
