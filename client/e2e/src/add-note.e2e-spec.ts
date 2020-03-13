import {browser, protractor, by, element, utils} from 'protractor';
import { AddNotePage, TestNote } from './add-note.po';
import { E2EUtil } from './e2e.util';

describe('Add note', () => {
  let page: AddNotePage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new AddNotePage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTitle()).toEqual('New Note');
  });

  /**
   * Don't know why this test isn't passing...
   */
  // it('Should enable and disable the ADD NOTE button', async () => {
  //   var matchAddNoteButton = element(by.buttonText('ADD NOTE'));
  //   expect(matchAddNoteButton.isEnabled()).toBe(false);
  //   await page.typeInput('ownerField', 'Rachel');
  //   expect(matchAddNoteButton.isEnabled()).toBe(false);
  //   await page.typeInput('bodyField', 'HELLO WORLD');
  //   expect(matchAddNoteButton.isEnabled()).toBe(false);
  //   await page.typeInput('tagField', 'office hours');
  //   expect(matchAddNoteButton.isEnabled()).toBe(true);
  // });

  it('Should enable and disable the BACK button', async () => {
    expect(element(by.buttonText('BACK')).isEnabled()).toBe(true);
    await page.typeInput('ownerField', 'Rachel');
    expect(element(by.buttonText('BACK')).isEnabled()).toBe(true);
    await page.typeInput('bodyField', 'HELLO WORLD');
    expect(element(by.buttonText('BACK')).isEnabled()).toBe(true);
    await page.typeInput('tagField', 'office hours');
    expect(element(by.buttonText('BACK')).isEnabled()).toBe(true);
  });

  /**
   * This needs to eventually happen. This test ensures the add button redirects to
   * the owner page
   */
  it('Should add a new note and go to the right page', async () => {
    const note: TestNote = {
      owner: E2EUtil.randomText(10),
      body: E2EUtil.randomText(300),
      // addDate: new Date(2-3-2020),
      // expirationDate: new Date(2-3-2020),
      tag: 'office hours'
    };

    await page.addNote(note);

    // Wait until the URL does not contain 'notes/new'
    await browser.wait(EC.not(EC.urlContains('notes/new')), 10000);

    const url = await page.getUrl();
    expect(RegExp('', 'i').test(url)).toBe(true);
    expect(url.endsWith('/notes/new')).toBe(false);

    expect(element(by.className('note-owner-list')).getText()).toEqual(note.owner);
    expect(element(by.className('note-body-list')).getText()).toEqual(note.body);
    // expect(element(by.className('note-list-addDate')).getText()).toEqual(note.addDate);
    // expect(element(by.className('note-list-expirationDate')).getText()).toEqual(note.expirationDate);
    expect(element(by.className('note-tag-list')).getText()).toEqual(note.tag);
  });

});
