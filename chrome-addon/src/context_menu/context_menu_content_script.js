import * as pivotalGlossaryLib from 'pivotal-glossary-lib';
import {ContextMenuEntryView} from './context_menu_entry_view';
import {ContextMenuToolTip} from './context_menu_tool_tip';

var entryRepository = new pivotalGlossaryLib.EntryRepository();

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.action == "display-entry") {
            entryRepository.find(request.search_term).then(entry => {
                new ContextMenuToolTip(new ContextMenuEntryView(entry || entryRepository.newNotFoundEntry(request.search_term), document).html).show();
            });
        }
    });