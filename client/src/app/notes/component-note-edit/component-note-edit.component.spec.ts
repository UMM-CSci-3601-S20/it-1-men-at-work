import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentNoteEditComponent } from './component-note-edit.component';

describe('ComponentNoteEditComponent', () => {
  let component: ComponentNoteEditComponent;
  let fixture: ComponentFixture<ComponentNoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentNoteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
