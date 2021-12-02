import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncVideoSliderComponent } from './sync-video-slider.component';

describe('SyncVideoSliderComponent', () => {
  let component: SyncVideoSliderComponent;
  let fixture: ComponentFixture<SyncVideoSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncVideoSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncVideoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
