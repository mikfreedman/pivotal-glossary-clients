import {DefinitionRepository} from './definition_repository';

var definitionRepository = new DefinitionRepository();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "display-definition") {
          var definition = definitionRepository.find(request.search_term);
          window.open(definition.url);
        }
 });
