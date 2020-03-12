import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-list-component',
  templateUrl: 'note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  providers: []
})

export class NoteListComponent implements OnInit, OnDestroy  {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredNotes: Note[];
  public filteredNotes: Note[];

  public noteDate: Date;
  getNotesSub: Subscription;

  // This is the constructor utilizing note service
  constructor(private noteService: NoteService) {
  }

  getNotesFromServer(): void {
    this.unsub();
    this.getNotesSub = this.noteService.getNotes()
    .subscribe(returnedNotes => {
      this.serverFilteredNotes = returnedNotes;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.getNotesFromServer();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
  }
}
