import {Definition} from './definition';
import {Slugger} from './slugger';

export class DefinitionRepository {
  constructor(baseURL = "https://cf-glossary.cfapps.io") {
    this.baseURL = baseURL;

    this.getData((response) => {
      this.definitions = _.map(Object.entries(response), function([key,value]) {
        return new Definition(baseURL, value);
      });
    });
  }

  find(searchText) {
    return this.definitions.find(function (o) { return o.slug === Slugger.slug(searchText); });
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
