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
  // constructor(private noteService: NoteService) {
  // }

  // getNotesFromServer(): void {
  //   this.unsub();
  //   // This line will be fixed with the addition of noteService
  //   this.getNotesSub = this.noteService.getNotes({
  //     addDate: this.noteDate
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
