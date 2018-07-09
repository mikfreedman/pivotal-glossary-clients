import {DefinitionRepository} from './definition_repository';
import {DefinitionView} from './definition_view';

import Tippy from 'tippy.js';

var definitionRepository = new DefinitionRepository();

const selectedTextReference = {
  getBoundingClientRect() {
    var s = window.getSelection();
    var oRange = s.getRangeAt(0);
    return oRange.getBoundingClientRect();
  },
  clientHeight: 100,
  clientWidth: 100
};

function toolTip(definition) {
  return Tippy.one(selectedTextReference, {
    trigger: 'manual',
    arrow: true,
    maxWidth: '400px',
    interactive: true,
    html: new DefinitionView(definition, definitionRepository, document).html
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "display-definition") {
      var definition = definitionRepository.find(request.search_term);
      if(definition === undefined) {
        toolTip(definitionRepository.fallbackDefinition(request.search_term))
          .show();
      } else {
        toolTip(definition)
          .show();
      }
    }
  });
