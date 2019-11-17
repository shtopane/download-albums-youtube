import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracklistTextareaComponent } from './tracklist-textarea.component';

describe('TracklistTextareaComponent', () => {
  let component: TracklistTextareaComponent;
  let fixture: ComponentFixture<TracklistTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracklistTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracklistTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
