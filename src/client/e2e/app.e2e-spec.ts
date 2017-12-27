import { PkiwhosnextPage } from './app.po';

describe('pkiwhosnext App', () => {
  let page: PkiwhosnextPage;

  beforeEach(() => {
    page = new PkiwhosnextPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
