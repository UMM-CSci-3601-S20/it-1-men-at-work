import {ViewerPage} from './viewer-page.po';
import {browser, protractor, by, element} from 'protractor';

describe('Viewer Page', () => {
  let page: ViewerPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new ViewerPage();
    page.navigateTo();
  });

  // Testing to check that the title matches the webpage title
  it('Should have the correct title', () => {
    expect(page.getNoteTitle()).toEqual('Virtual Note');
  });

  // Testing to check that the specified owner is present in the list
  it('Should read through the list of notes to check the specified owner is present', async () => {
    page.getNoteListItems().each(e => {
      expect(e.element(by.className('note-owner-list')).getText()).toEqual('Jack Perala');
    });
  });

  it('Should read through the list of notes to check the specified owner is not present', async () => {
    page.getNoteListItems().each(e => {
      expect(e.element(by.className('note-owner-list')).getText()).toBeFalsy('KK Lamberty');
    });
  });

  // Testing to check that the specified note tag is present in the list
  it('Should read through the list of notes to check the specified note tag is present', async () => {
    page.getNoteListItems().each(e => {
      expect(e.element(by.className('note-tag-list')).getText()).toEqual('office hours');
    });
  });

  // Testing to check that the specified note tag is not present in the list
  it('Should read through the list of notes to check the specified note tag is not present', async () => {
    page.getNoteListItems().each(e => {
      expect(e.element(by.className('note-tag-list')).getText()).toBeFalsy('meeting');
    });
  });

  // Testing to check that the provided string is present in one of the bodies of the notes
  // With random capitalization
  it('Should read through the list of notes to check there is a body with the string present', async () => {
    page.getNoteListItems().each(e => {
      expect(e.element(by.className('note-body-list')).getText()).toEqual('RuN');
    });
  });

  // Testing to check that the provided string is present in one of the bodies of the notes
  // With all lower case letters
  it('Should read through the list of notes to check there is a body with the string present', async () => {
    page.getNoteListItems().each(e => {
      expect(e.element(by.className('note-body-list')).getText()).toEqual('run');
    });
  });

  // Testing to check that the provided string is not present in any of the bodies of the notes
  // With random capitalization
  it('Should read through the list of notes to check there are no bodies with the given string', async () => {
    page.getNoteListItems().each(e => {
      expect(e.element(by.className('note-body-list')).getText()).toBeFalsy('ZzZ');
    });
  });

  // Testing to check that the provided string is not present in one of the bodies of the notes
  // With all lower case letters
  it('Should read through the list of notes to check there are no bodies with the given string', async () => {
    page.getNoteListItems().each(e => {
      expect(e.element(by.className('note-body-list')).getText()).toBeFalsy('zzz');
    });
  });
});
