import {browser, by, element, Key, ElementFinder} from 'protractor';

export class ViewerPage {

  navigateTo() {
    return browser.get('/viewer');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getNoteTitle() {
    const title = element(by.className('viewer-page-title')).getText();
    return title;
  }

  getNoteListItems() {
    return element(by.className('viewer-page-nav')).all(by.className('note-list-item'));
  }
}
