import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTextareaComponent } from './playlist-textarea.component';

describe('PlaylistTextareaComponent', () => {
  let component: PlaylistTextareaComponent;
  let fixture: ComponentFixture<PlaylistTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistTextareaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
