import { TestBed } from '@angular/core/testing';

import { SliceDownloadAlbumService } from './slice-download-album.service';

describe('SliceDownloadAlbumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SliceDownloadAlbumService = TestBed.get(SliceDownloadAlbumService);
    expect(service).toBeTruthy();
  });
});
