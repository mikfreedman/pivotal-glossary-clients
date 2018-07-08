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

  find({search_term, success, failure}) {
    var definition = this.definitions.find(function (o) { return o.slug === Slugger.slug(search_term); });

    if(definition == undefined) {
      failure(new Definition(this.baseURL, {headword: search_term}));
    } else {
      success(definition);
    }
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
    return ;
  }
}
