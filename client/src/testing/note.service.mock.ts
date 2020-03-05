import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../app/notes/note';
import { NoteService } from '../app/notes/note.service';

/**
 * A "mock" version of the `UserService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockNoteService extends NoteService {
  static testNotes: Note[] = [
    {
      _id: 'jack_id',
      owner: 'Jack',
      body: 'I will be out of town due to my dog has been severely sick',
      addDate: new Date(3 - 20 - 2020),
      expirationDate: new Date(3 - 21 - 2020),
      tag: 'office hours'
    },
    {
    _id: 'josh_id',
      owner: 'josh',
      body: 'My car is stuck in the ditch my office hours are canceled',
      addDate: new Date(1 - 1 - 2020),
      expirationDate: new Date(1 - 2 - 2020),
      tag: 'office hours'
    },
    {
      _id: 'trent_id',
      owner: 'Trent',
      body: 'I will be gone for the rest of the week, I have a track meet.',
      addDate: new Date(2 - 24 - 2020),
      expirationDate: new Date(2 - 28 - 2020),
      tag: 'class'
    }
  ];

  constructor() {
    super(null);
  }

  getNotes(): Observable<Note[]> {
    // Just return the test users regardless of what filters are passed in
    return of(MockNoteService.testNotes);
  }

  getNoteById(id: string): Observable<Note> {
    // If the specified ID is for the first test user,
    // return that user, otherwise return `null` so
    // we can test illegal user requests.
    if (id === MockNoteService.testNotes[0]._id) {
      return of(MockNoteService.testNotes[0]);
    } else {
      return of(null);
    }
  }

}


