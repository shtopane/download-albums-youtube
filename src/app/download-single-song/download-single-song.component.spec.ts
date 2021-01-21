import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSingleSongComponent } from './download-single-song.component';

describe('DownloadSingleSongComponent', () => {
  let component: DownloadSingleSongComponent;
  let fixture: ComponentFixture<DownloadSingleSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSingleSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSingleSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
