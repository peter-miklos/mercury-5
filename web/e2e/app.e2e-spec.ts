import { Mercury5Page } from './app.po';

describe('mercury5 App', () => {
  let page: Mercury5Page;

  beforeEach(() => {
    page = new Mercury5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
