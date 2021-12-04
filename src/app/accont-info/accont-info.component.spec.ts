import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccontInfoComponent } from './accont-info.component';

describe('AccontInfoComponent', () => {
  let component: AccontInfoComponent;
  let fixture: ComponentFixture<AccontInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccontInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccontInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
