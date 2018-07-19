export class ContextMenuSearch {
  constructor(browser, displayEntry) {
    this.browser = browser;
    this.displayEntry = displayEntry;

    this.browser.contextMenus.create({
      id: 'pivotal-glossary',
      title: "Lookup \"%s\" in Pivotal Glossary",
      contexts:["selection"]
    });

    this.browser.contextMenus.onClicked.addListener(this.getWord.bind(this));
  }

  getWord(info) {
    if (info.menuItemId == "pivotal-glossary") {
      if (this.injected) {
        this.displayEntry(info.selectionText);
      }
      else {
        this.browser.tabs.executeScript({
          file: 'content_script.js'
        }, () => {
          this.displayEntry(info.selectionText);
          this.injected = true;
        });
      }
    }
  }
}

