import {ContextMenuSearch} from 'context_menu_search';

var displayDefinition = function displayDefinition(searchTerm) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var response = {
      action: "display-definition",
      search_term: searchTerm
    };

    chrome.tabs.sendMessage(tabs[0].id, response, function(response) {});
  });
};

var contextMenuSearch = new ContextMenuSearch(chrome, displayDefinition);
