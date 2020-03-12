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


  it('Should enable and disable the add note button', async () => {
    // expect(element(by.buttonText('ADD NOTE')).isEnabled()).toBe(false);
    // await page.typeInput('ownerField', 'Rachel');
    // expect(element(by.buttonText('ADD NOTE')).isEnabled()).toBe(false);
    // await page.typeInput('bodyField', 'HELLO WORLD');
    // expect(element(by.buttonText('ADD NOTE')).isEnabled()).toBe(false);
    // await page.typeInput('tagField', 'office hours');
    expect(element(by.buttonText('ADD NOTE')).isEnabled()).toBe(false);
  });

  /**
   * This needs to eventually happen. This test ensures the add button redirects to
   * the owner page
   */
  // it('Should add a new note and go to the right page', async () => {
  //   const note: TestNote = {
  //     owner: E2EUtil.randomText(10),
  //     body: E2EUtil.randomText(100),
  //     // addDate: new Date(2-3-2020),
  //     // expirationDate: new Date(2-3-2020),
  //     tag: 'office hours'
  //   };

  //   await page.addNote(note);

  //   // Wait until the URL does not contain 'notes/new'
  //   await browser.wait(EC.not(EC.urlContains('notes/new')), 10000);

  //   const url = await page.getUrl();
  //   expect(RegExp('.*\/notes\/[0-9a-fA-F]{24}$', 'i').test(url)).toBe(true);
  //   expect(url.endsWith('/notes/new')).toBe(true);

  //   expect(element(by.className('note-list-owner')).getText()).toEqual(note.owner);
  //   expect(element(by.className('note-list-company')).getText()).toEqual(note.body);
  //   // expect(element(by.className('note-list-addDate')).getText()).toEqual(note.addDate);
  //   // expect(element(by.className('note-list-expirationDate')).getText()).toEqual(note.expirationDate);
  //   expect(element(by.className('note-list-tag')).getText()).toEqual(note.tag);
  // });

});
