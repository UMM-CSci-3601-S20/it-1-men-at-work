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
import { MockUserService } from '../../testing/user.service.mock';
// Fix for Note class
// import { User } from './user';
// Fix for NoteListComponent
// import { UserListComponent } from './user-list.component';
// Fix for NoteService
// import { UserService } from './user.service';
import { MatIconModule } from '@angular/material/icon';

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

// Fix the User list for Notes List
describe('User list', () => {

  // Error will be fixed with addition of NLComp
  let noteList: NoteListComponent;
  // Error will be fixed with addition of NLComp
  let fixture: ComponentFixture<NoteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
        // Replace with NLComp
      // declarations: [UserListComponent],
        // Provide a test-double instead
        // Replace with NoteService & MockNote
      // providers: [{ provide: UserService, useValue: new MockUserService() }]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      // Error will be fixed with addition of NLComp
      fixture = TestBed.createComponent(NoteListComponent);
      noteList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the notes', () => {
    // Replace SFUsers w/ SFNotes
    expect(noteList.serverFilteredUsers.length).toBe(3);
  });
});
