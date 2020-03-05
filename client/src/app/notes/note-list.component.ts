import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from './note';
// This line will be fixed with the addition of NoteService
// import { NoteService } from './note.service';
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

  public addDate: Date;
  getNotesSub: Subscription;

  // This line will be fixed with the addition of NoteService
  // constructor(private noteService: NoteService) {

  // }

  // This whole block will be fixed when noteService is merged in.
  // getNotesFromServer(): void {
  //   this.unsub();
  //   // This line will be fixed with the addition of noteService
  //   this.getNotesSub = this.noteService.getNotes({
  //     noteDate: this.addDate
  //   }).subscribe(returnedNotes => {
  //     this.serverFilteredNotes = returnedNotes;
  //     this.updateFilter();
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  public updateFilter(): void {
  }

  ngOnInit(): void {
    // this.getNotesFromServer();
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
