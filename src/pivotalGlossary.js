window.Glossaries = window.Glossaries || {};

(function(PivotalGlossary) {
  function pivotalGlossary(chrome) {
    function slugify(text)
    {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }

    function getword(info,tab) {
      if (info.menuItemId == "pivotal-glossary") {
        chrome.tabs.create({
          url: "https://pivotal-glossary.pivotalapps.io/#" + slugify(info.selectionText)
        });
      }
    }

    chrome.contextMenus.create({
      id: 'pivotal-glossary',
      title: "Lookup %s in Pivotal Glossary",
      contexts:["selection"]
    });

    chrome.contextMenus.onClicked.addListener(getword);
  }

  Glossaries.PivotalGlossary = pivotalGlossary;
})(window.Glossaries);
