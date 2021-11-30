import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConferenciaComponent } from './video-conferencia.component';

describe('VideoConferenciaComponent', () => {
  let component: VideoConferenciaComponent;
  let fixture: ComponentFixture<VideoConferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoConferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoConferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
