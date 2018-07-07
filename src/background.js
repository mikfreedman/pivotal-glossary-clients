import {DefinitionRepository} from './definition_repository';
import {ContextMenuSearch} from 'context_menu_search';

var definitionRepository = new DefinitionRepository();

var displayDefinition = function displayDefinition(definition) {
  chrome.tabs.create({
    url: definition.url
  });
}

var contextMenuSearch = new ContextMenuSearch(chrome, definitionRepository, displayDefinition);
