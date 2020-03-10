import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockNoteService } from 'src/testing/note.service.mock';
import { AddNoteComponent } from './add-note.component';
import { NoteService } from './note.service';

describe('AddNoteComponent', () => {
  let addNoteComponent: AddNoteComponent;
  let addNoteForm: FormGroup;
  let calledClose: boolean;
  let fixture: ComponentFixture<AddNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AddNoteComponent],
      providers: [{ provide: NoteService, useValue: new MockNoteService() }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    calledClose = false;
    fixture = TestBed.createComponent(AddNoteComponent);
    addNoteComponent = fixture.componentInstance;
    addNoteComponent.ngOnInit();
    fixture.detectChanges();
    addNoteForm = addNoteComponent.addNoteForm;
    expect(addNoteForm).toBeDefined();
    expect(addNoteForm.controls).toBeDefined();
  });

  // Not terribly important; if the component doesn't create
  // successfully that will probably blow up a lot of things.
  // Including it, though, does give us confidence that our
  // our component definitions don't have errors that would
  // prevent them from being successfully constructed.
  it('should create the component and form', () => {
    expect(addNoteComponent).toBeTruthy();
    expect(addNoteForm).toBeTruthy();
  });

  // Confirms that an initial, empty form is *not* valid, so
  // people can't submit an empty form.
  it('form should be invalid when empty', () => {
    expect(addNoteForm.valid).toBeFalsy();
  });

  describe('The owner field', () => {
    let ownerControl: AbstractControl;

    beforeEach(() => {
      ownerControl = addNoteComponent.addNoteForm.controls[`name`];
    });

    it('should not allow empty names', () => {
      ownerControl.setValue('');
      expect(ownerControl.valid).toBeFalsy();
    });

    it('should be fine with "Joshua Hamann"', () => {
      ownerControl.setValue('Joshua Hamann');
      expect(ownerControl.valid).toBeTruthy();
    });

    it('should fail on single character names', () => {
      ownerControl.setValue('x');
      expect(ownerControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.minLength(2)`.
      expect(ownerControl.hasError('minlength')).toBeTruthy();
    });

    // In the real world, you'd want to be pretty careful about
    // setting upper limits on things like name lengths just
    // because there are people with really long names.
    it('should fail on really long names', () => {
      ownerControl.setValue('x'.repeat(100));
      expect(ownerControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.maxLength(2)`.
      expect(ownerControl.hasError('maxlength')).toBeTruthy();
    });

    it('should not allow a name to contain a symbol', () => {
      ownerControl.setValue('bad@email.com');
      expect(ownerControl.valid).toBeFalsy();
      expect(ownerControl.hasError('pattern')).toBeTruthy();
    });

    it('should allow digits in the name', () => {
      ownerControl.setValue('Bad2Th3B0ne');
      expect(ownerControl.valid).toBeTruthy();
    });

    it('should fail if we provide an "existing" owner', () => {
      // We're assuming that "abc123" and "123abc" already
      // exist so we disallow them.
      ownerControl.setValue('abc123');
      expect(ownerControl.valid).toBeFalsy();
      expect(ownerControl.hasError('existingOwner')).toBeTruthy();

      ownerControl.setValue('123abc');
      expect(ownerControl.valid).toBeFalsy();
      expect(ownerControl.hasError('existingOwner')).toBeTruthy();
    });
  });

  describe('The body field', () => {
    it('should allow empty values', () => {
      const bodyControl = addNoteForm.controls[`body`];
      bodyControl.setValue('');
      expect(bodyControl.valid).toBeTruthy();
    });
  });

  describe('The tag field', () => {
    it('should allow empty values', ()=>{
      const tagControl = addNoteForm.controls{'tag'};
      tagControl.setValue('');
      expect(tagControl.valid).toBeTruthy();
    });

  })
});
