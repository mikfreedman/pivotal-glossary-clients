export class ContextMenuSearch {
  constructor(browser, definitionRepository, foundWordCallback) {
    this.browser = browser;
    this.definitionRepository = definitionRepository;
    this.foundWordCallback = foundWordCallback;

    this.browser.contextMenus.create({
      id: 'pivotal-glossary',
      title: "Lookup \"%s\" in Pivotal Glossary",
      contexts:["selection"]
    });

    this.browser.contextMenus.onClicked.addListener(this.getword.bind(this));
  }

  getword(info,tab) {
    if (info.menuItemId == "pivotal-glossary") {
      this.foundWordCallback(this.definitionRepository.find(info.selectionText));
    }
  }
}

