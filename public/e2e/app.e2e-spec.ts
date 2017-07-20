import { OgkPage } from './app.po';

describe('ogk App', () => {
  let page: OgkPage;

  beforeEach(() => {
    page = new OgkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to ogk!!');
  });
});
