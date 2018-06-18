import { TestBed, inject } from '@angular/core/testing';

import { UploadPhotosService } from './upload-photos.service';

describe('UploadPhotosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadPhotosService]
    });
  });

  it('should be created', inject([UploadPhotosService], (service: UploadPhotosService) => {
    expect(service).toBeTruthy();
  }));
});
