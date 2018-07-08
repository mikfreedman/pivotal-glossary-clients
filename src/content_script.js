import {DefinitionRepository} from './definition_repository';

var definitionRepository = new DefinitionRepository();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "display-definition") {
      definitionRepository.find({
        search_term: request.search_term,
        success: (definition) => {
          alert(definition.expansion);
        },
        failure: (definition) => {
          window.open(definition.url);
        }
      });
    }
  }
);
