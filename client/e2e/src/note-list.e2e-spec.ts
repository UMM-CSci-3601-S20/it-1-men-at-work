import {NotePage} from './note-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('Note list', () => {
  let page: NotePage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new NotePage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getNoteTitle()).toEqual('Post-Its');
  });
});
