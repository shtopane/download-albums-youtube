import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSliceAlbumsFormComponent } from './download-slice-albums-form.component';

describe('DownloadSliceAlbumsFormComponent', () => {
  let component: DownloadSliceAlbumsFormComponent;
  let fixture: ComponentFixture<DownloadSliceAlbumsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadSliceAlbumsFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSliceAlbumsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
