import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPlaylistComponent } from './download-playlist.component';

describe('DownloadPlaylistComponent', () => {
  let component: DownloadPlaylistComponent;
  let fixture: ComponentFixture<DownloadPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
