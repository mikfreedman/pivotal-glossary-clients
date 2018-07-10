import {EntryRepository} from './entry_repository';
import {EntryView} from './entry_view';

import Tippy from 'tippy.js';

var entryRepository = new EntryRepository();

const selectedTextReference = {
  getBoundingClientRect() {
    var s = window.getSelection();
    var oRange = s.getRangeAt(0);
    return oRange.getBoundingClientRect();
  },
  clientHeight: 100,
  clientWidth: 100
};

function toolTip(entry) {
  return Tippy.one(selectedTextReference, {
    trigger: 'manual',
    arrow: true,
    maxWidth: '400px',
    interactive: true,
    html: new EntryView(entry, entryRepository, document).html
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "display-entry") {
      var entry = entryRepository.find(request.search_term) || entryRepository.newNotFoundEntry(request.search_term);
      toolTip(entry).show();
    }
  });
