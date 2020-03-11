import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Note } from './note';
import { NoteService } from './note.service';

describe('Note service: ', () => {
  // A small collection of test users
  const testNotes: Note[] = [
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
      tag: 'class time'
    }


  ];
  let noteService: NoteService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    noteService = new NoteService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getNotes() calls api/notes', () => {
    // Assert that the users we get from this call to getUsers()
    // should be our set of test users. Because we're subscribing
    // to the result of getUsers(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testUsers) a few lines
    // down.
    noteService.getNotes().subscribe(
      notes => expect(notes).toBe(testNotes)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(noteService.noteUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testNotes);
  });

  it('getNoteById() calls api/notes/id', () => {
    const targetNote: Note = testNotes[1];
    const targetId: string = targetNote._id;
    noteService.getNoteById(targetId).subscribe(
      note => expect(note).toBe(targetNote)
    );

    const expectedUrl: string = noteService.noteUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetNote);
  });


  it('addNote() calls api/notes/new', () => {

    noteService.addNote(testNotes[1]).subscribe(
      id => expect(id).toBe('testid')
    );

    const req = httpTestingController.expectOne(noteService.noteUrl + '/new');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testNotes[1]);

    req.flush({id: 'testid'});
  });
});
