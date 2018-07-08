import {Definition} from './definition';

export class DefinitionRepository {
  constructor(baseURL = "https://cf-glossary.cfapps.io") {
    this.baseURL = baseURL;

    this.getData((response) => {
      this.definitions = Object.entries(response).map(([key,value]) => {
        new Definition(baseURL, value);
      });
    });
  }

  find(searchText) {
    return this.definitions.find((def) => {
      def.matches(searchText);
    });
  }

  getData(success) {
    this.loaded = fetch(this.baseURL + "/words.json", {
      method: 'get'
    }).then(response => {
      return response.json();
    }).then(success)
      .catch(err => {
        throw err;
      });
  }

  fallbackDefinition(searchTerm) {
    return new Definition(this.baseURL, {headword: searchTerm});
  }
}
