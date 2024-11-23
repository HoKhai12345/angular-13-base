import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInforComponent } from './user-info.component';

describe('UserInforComponent', () => {
  let component: UserInforComponent;
  let fixture: ComponentFixture<UserInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInforComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
