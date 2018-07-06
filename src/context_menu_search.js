export class ContextMenuSearch {
  constructor(browser) {
    this.browser = browser;

    this.browser.contextMenus.create({
      id: 'pivotal-glossary',
      title: "Lookup \"%s\" in Pivotal Glossary",
      contexts:["selection"]
    });

    this.browser.contextMenus.onClicked.addListener(this.getword.bind(this));
  }

  slugify(text)
  {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }

  getword(info,tab) {
    if (info.menuItemId == "pivotal-glossary") {
      this.browser.tabs.create({
        url: "https://cf-glossary.cfapps.io/#" + this.slugify(info.selectionText)
      });
    }
  }
}

