import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUniqueOptionComponent } from './c-unique-option.component';

describe('CUniqueOptionComponent', () => {
  let component: CUniqueOptionComponent;
  let fixture: ComponentFixture<CUniqueOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CUniqueOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CUniqueOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
