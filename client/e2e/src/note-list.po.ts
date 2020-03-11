import {browser, by, element, Key, ElementFinder} from 'protractor';

export class NotePage {

  navigateTo() {
    return browser.get('/notes');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getNoteTitle() {
    const title = element(by.className('note-list-title')).getText();
    return title;
  }

  getNoteListItems() {
    return element(by.className('note-nav-list')).all(by.className('note-list-item'));
  }

  // Unused at the moment but will be needed when add note is working
  clickAddUserFAB() {
    return element(by.className('add-note-fab')).click();
  }
}
