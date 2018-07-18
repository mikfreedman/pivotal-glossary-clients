import {ContextMenuSearch} from 'context_menu_search';

var displayEntry = function displayEntry(searchTerm) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var response = {
      action: "display-entry",
      search_term: searchTerm
    };

    chrome.tabs.sendMessage(tabs[0].id, response, function(response) {});
  });
};

new ContextMenuSearch(chrome, displayEntry);
