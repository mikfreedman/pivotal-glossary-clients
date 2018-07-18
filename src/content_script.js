import {EntryRepository} from './entry_repository';
import {EntryView} from './entry_view';
import {ToolTip} from './tool_tip';

var entryRepository = new EntryRepository();

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.action == "display-entry") {
            var entry = entryRepository.find(request.search_term) || entryRepository.newNotFoundEntry(request.search_term);
            new ToolTip(new EntryView(entry, document).html).show();
        }
    });