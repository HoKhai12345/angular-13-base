import { TestBed } from '@angular/core/testing';
import { SiteHeaderComponent } from './site-header.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SiteHeaderComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-18'`, () => {
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-18');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-18 app is running!');
  });
});
