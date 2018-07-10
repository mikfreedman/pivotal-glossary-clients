export class ContextMenuSearch {
  constructor(browser, displayEntry) {
    this.browser = browser;
    this.displayEntry = displayEntry;

    this.browser.contextMenus.create({
      id: 'pivotal-glossary',
      title: "Lookup \"%s\" in Pivotal Glossary",
      contexts:["selection"]
    });

    this.browser.contextMenus.onClicked.addListener(this.getword.bind(this));
  }

  getword(info,tab) {
    if (info.menuItemId == "pivotal-glossary") {
      this.displayEntry(info.selectionText);
    }
  }
}

