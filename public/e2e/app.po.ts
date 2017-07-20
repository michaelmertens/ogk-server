import { browser, by, element } from 'protractor';

export class OgkPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ogk-root h1')).getText();
  }
}
