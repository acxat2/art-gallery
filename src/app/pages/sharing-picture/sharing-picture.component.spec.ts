import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingPictureComponent } from './sharing-picture.component';

describe('SharingPictureComponent', () => {
  let component: SharingPictureComponent;
  let fixture: ComponentFixture<SharingPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharingPictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharingPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
