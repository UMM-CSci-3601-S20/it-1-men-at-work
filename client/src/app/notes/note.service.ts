import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note } from './note';
import { map } from 'rxjs/operators';

@Injectable()
export class NoteService {
  readonly noteUrl: string = environment.API_URL + 'notes';

  constructor(private httpClient: HttpClient) {
  }

  getNotes(): Observable<Note[]> {
    let httpParams: HttpParams = new HttpParams();
    return this.httpClient.get<Note[]>(this.noteUrl, {
      params: httpParams,
    });
  }

  getNoteById(id: string): Observable<Note> {
    return this.httpClient.get<Note>(this.noteUrl + '/' + id);
  }

  addNote(newNote: Note): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.noteUrl + '/new', newNote).pipe(map(res => res.id));
  }

}
