import {browser, by, element, Key, ElementFinder} from 'protractor';

export interface TestNote {
  owner: string;
  body: string;
  tag: 'office hours' | 'personal' | 'class time';
}

export class AddNotePage {
  navigateTo() {
    return browser.get('/notes/new');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    const title = element(by.className('add-note-title')).getText();
    return title;
  }

  async typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  selectMatSelectValue(selectID: string, value: string) {
    const sel = element(by.id(selectID));
    return sel.click().then(() => {
      return element(by.css('mat-option[value="' + value + '"]')).click();
    });
  }

  clickAddUser() {
    return element(by.buttonText('ADD NOTE')).click();
  }

  async addNote(newNote: TestNote) {
    await this.typeInput('ownerField', newNote.owner);
    await this.typeInput('bodyField', newNote.body);
    // if (newNote.addDate) {
    //   await this.typeInput('addDateField', newNote.addDate);
    // }
    if (newNote.tag) {
      await this.typeInput('tagField', newNote.tag);
    }
    await this.selectMatSelectValue('tagField', newNote.tag);
    return this.clickAddUser();
  }
}
