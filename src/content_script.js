import {DefinitionRepository} from './definition_repository';

var definitionRepository = new DefinitionRepository();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "display-definition") {
          var definition = definitionRepository.find(request.search_term);
          if(definition === undefined) {
            window.open(definitionRepository.fallbackDefinition(request.search_term).url);
          } else {
            alert(definition.expansion);
          }
        }
 });
