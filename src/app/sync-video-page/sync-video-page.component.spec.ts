import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncVideoPageComponent } from './sync-video-page.component';

describe('SyncVideoPageComponent', () => {
  let component: SyncVideoPageComponent;
  let fixture: ComponentFixture<SyncVideoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncVideoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncVideoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
