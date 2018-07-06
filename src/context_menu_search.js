import {DefinitionRepository} from './definition_repository';

export class ContextMenuSearch {
  constructor(browser) {
    this.browser = browser;
    this.definitionRepository = new DefinitionRepository();

    this.browser.contextMenus.create({
      id: 'pivotal-glossary',
      title: "Lookup \"%s\" in Pivotal Glossary",
      contexts:["selection"]
    });

    this.browser.contextMenus.onClicked.addListener(this.getword.bind(this));
  }

  getword(info,tab) {
    if (info.menuItemId == "pivotal-glossary") {
      var definition = definitionRepository.find(info.selectionText);
      this.browser.tabs.create({
        url: definition.url()
      });
    }
  }
}

