import {Entry} from './entry';

export class EntryRepository {
  constructor(baseURL = "http://wtf.eng.vmware.com/api/def/get/") {
    this.baseURL = baseURL;
  }

  find(searchText) {
    let url = `${this.baseURL}?word=${searchText}`
    return fetch(url)
      .then(res => res.json())
      .then(body => {
        if (body.error) {
          console.log(`Glossary Extension Fetch Error: ${body.error}`);
          return;
        }
        if (body.status === 'error')
          return newNotFoundEntry(searchText);

        return new Entry(url, body.defs[0]);
      })
      .catch(err => {
        console.log(`Glossary Extension Fetch Error`);
        console.error(err);
      });
  }

  newNotFoundEntry(searchTerm) {
    return new Entry(this.baseURL, {headword: searchTerm, definition: "No Entry Found"});
  }
}
