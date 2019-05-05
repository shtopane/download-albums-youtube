import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAlbumFormComponent } from './download-album-form.component';

describe('DownloadAlbumFormComponent', () => {
  let component: DownloadAlbumFormComponent;
  let fixture: ComponentFixture<DownloadAlbumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadAlbumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAlbumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
