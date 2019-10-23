import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMuseumPage } from './all-museum.page';

describe('AllMuseumPage', () => {
  let component: AllMuseumPage;
  let fixture: ComponentFixture<AllMuseumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMuseumPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMuseumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
