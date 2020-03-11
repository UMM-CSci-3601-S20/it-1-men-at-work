import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Note } from './note';
import { NoteService } from './note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  addNoteForm: FormGroup;

  note: Note;



  constructor(private fb: FormBuilder, private noteService: NoteService, private snackBar: MatSnackBar, private router: Router) {
  }

  // not sure if this name is magical and making it be found or if I'm missing something,
  // but this is where the red text that shows up (when there is invalid input) comes from
  add_note_validation_messages = {
    owner: [
      {type: 'required', message: 'Owner is required'},
      {type: 'minlength', message: 'Owner must be at least 2 characters long'},
      {type: 'maxlength', message: 'Owner cannot be more than 50 characters long'},
      {type: 'pattern', message: 'Owner must contain only numbers and letters'},
      {type: 'existingName', message: 'Owner has already been taken'}
    ],
    body: [
      {type: 'pattern', message: 'Body must contain some type of text'},
      // {type: 'required', message: 'Body is required'}
    ],
    // addDate: [
    //   {type: 'pattern', message: 'For testing purposes, this should be in ISO format'}
    // ],
    // expirationDate: [
    //   {type: 'pattern', message: 'For testing purposes, this should be in ISO format'}
    // ]

  };

  createForms() {

    // add note form validations
    this.addNoteForm = this.fb.group({
      // We allow alphanumeric input and limit the length for name.
      owner: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        // In the real world you'd want to be very careful about having
        // an upper limit like this because people can sometimes have
        // very long names. This demonstrates that it's possible, though,
        // to have maximum length limits.
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?'),
        (fc) => {
          if (fc.value.toLowerCase() === 'abc123' || fc.value.toLowerCase() === '123abc') {
            return ({existingOwner: true});
          } else {
            return null;
          }
        },
      ])),

      body: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9,;./\\n+]+( [a-zA-Z0-9,;./\\n+]+)*$')
      ])),

      addDate: new FormControl('', Validators.compose([
      ])),
      expirationDate: new FormControl('', Validators.compose([
      ])),
      // We don't care much about what is in the company field, so we just add it here as part of the form
      // without any particular validation.


      // We don't need a special validator just for our app here, but there is a default one for email.
      // We will require the email, though.
      tag: new FormControl('', Validators.compose([
        Validators.pattern('^(office hours|personal|class time)$'),
      ])),

    });

  }

  ngOnInit() {
    this.createForms();
  }


  submitForm() {
    this.noteService.addNote(this.addNoteForm.value).subscribe(newID => {
      this.snackBar.open('Added Note ' + this.addNoteForm.value.owner, null, {
        duration: 2000,
      });
      this.router.navigate(['/notes/', newID]);
    }, err => {
      this.snackBar.open('Failed to add the note', null, {
        duration: 2000,
      });
    });
  }

}
