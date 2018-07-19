import {Entry} from './entry';

export class EntryRepository {
  constructor(baseURL = "https://cf-glossary.cfapps.io") {
    this.baseURL = baseURL;

    this.getData((response) => {
      this.entries = Object.entries(response).map(([key,value]) => {
        return new Entry(baseURL, value);
      });
    });
  }

  find(searchText) {
    return this.entries.find((def) => {
      return def.matches(searchText);
    });
  }

  getData(success) {
    fetch(this.baseURL + "/words.json", {
      method: 'get'
    }).then(response => {
      return response.json();
    }).then(success)
      .catch(err => {
        throw err;
      });
  }

  newNotFoundEntry(searchTerm) {
    return new Entry(this.baseURL, {headword: searchTerm, definition: "No Entry Found"});
  }
}
