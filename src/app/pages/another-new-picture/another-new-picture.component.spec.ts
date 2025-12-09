import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherPictureComponent } from './another-new-picture.component';

describe('AnotherPictureComponent', () => {
  let component: AnotherPictureComponent;
  let fixture: ComponentFixture<AnotherPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotherPictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
