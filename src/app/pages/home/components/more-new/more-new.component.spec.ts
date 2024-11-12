import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreNewComponent } from './more-new.component';

describe('MoreNewComponent', () => {
  let component: MoreNewComponent;
  let fixture: ComponentFixture<MoreNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoreNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
