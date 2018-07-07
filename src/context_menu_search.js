export class ContextMenuSearch {
  constructor(browser, displayDefinition) {
    this.browser = browser;
    this.displayDefinition = displayDefinition;

    this.browser.contextMenus.create({
      id: 'pivotal-glossary',
      title: "Lookup \"%s\" in Pivotal Glossary",
      contexts:["selection"]
    });

    this.browser.contextMenus.onClicked.addListener(this.getword.bind(this));
  }

  getword(info,tab) {
    if (info.menuItemId == "pivotal-glossary") {
      this.displayDefinition(info.selectionText);
    }
  }
}

