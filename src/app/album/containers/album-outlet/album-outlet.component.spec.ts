import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumOutletComponent } from './album-outlet.component';

describe('AlbumOutletComponent', () => {
  let component: AlbumOutletComponent;
  let fixture: ComponentFixture<AlbumOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
