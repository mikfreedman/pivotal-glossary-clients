import {Entry} from 'pivotal-glossary-lib';

export class EntryRepository {
    constructor(baseURL = "https://cf-glossary.cfapps.io") {
        this.baseURL = baseURL;
        this.getData();
    }

    find(searchText) {
        return this.entries.find((def) => {
            return def.matches(searchText);
        });
    }

    all() {
      return this.entries;
    }

    getData() {
       var response = UrlFetchApp.fetch(this.baseURL + "/words.json", {
        method: "get",
        muteHttpExceptions: true
      });

      var rawResponse = response.getContentText();
      var parsedResponse = JSON.parse(rawResponse);

      this.entries = Object.entries(response).map(([key, value]) => {
                return new Entry(this.baseURL, value);
      });
    }

    newNotFoundEntry(searchTerm) {
        return new Entry(this.baseURL, {headword: searchTerm, definition: "No Entry Found"});
    }
}
