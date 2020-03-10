import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockNoteService } from '../../testing/note.service.mock';
import { Note } from './note';
import { NoteListComponent } from './note-list.component';
import { NoteService } from './note.service';
import { MatIconModule } from '@angular/material/icon';
import { splitClasses } from '@angular/compiler';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('Note list', () => {

  let noteList: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [NoteListComponent],
      providers: [{ provide: NoteService, useValue: new MockNoteService() }]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(NoteListComponent);
      noteList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the notes', () => {
    expect(noteList.serverFilteredNotes.length).toBe(3);
  });

  it('contains a user named \'Jack\'', () => {
    expect(noteList.serverFilteredNotes.some((note: Note) => note.owner === 'Jack')).toBe(true);
  });

  it('contain a user named \'josh\'', () => {
    expect(noteList.serverFilteredNotes.some((note: Note) => note.owner === 'josh')).toBe(true);
  });

  it('contain a user named \'Trent\'', () => {
    expect(noteList.serverFilteredNotes.some((note: Note) => note.owner === 'Trent')).toBe(true);
  });

  it('doesn\'t contain a user named \'KK\'', () => {
    expect(noteList.serverFilteredNotes.some((note: Note) => note.owner === 'KK')).toBe(false);
  });
});
