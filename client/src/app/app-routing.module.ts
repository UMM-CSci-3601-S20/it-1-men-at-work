import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { AddUserComponent } from './users/add-user.component';
import { AddNoteComponent } from './notes/add-note.component';
import { NoteListComponent } from './notes/note-list.component';
import { ViewerPageComponent} from './notes/viewer-page.component';


const routes: Routes = [
  {path: '', component: NoteListComponent},
  {path: 'notes/new', component: AddNoteComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/new', component: AddUserComponent},
  {path: 'users/:id', component: UserProfileComponent},
  {path: 'viewer', component: ViewerPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
