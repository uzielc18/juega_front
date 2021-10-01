import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfimComponent } from './dialog-confim.component';

describe('DialogConfimComponent', () => {
  let component: DialogConfimComponent;
  let fixture: ComponentFixture<DialogConfimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
