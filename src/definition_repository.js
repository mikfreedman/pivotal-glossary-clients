import {Definition} from './definition';

export class DefinitionRepository {
  constructor(baseURL = "https://cf-glossary.cfapps.io") {
    this.baseURL = baseURL;

    this.getData(function(response) {
      this.definitions = _.map(Object.entries(response), function(def) {
        return new Definition(baseURL, def);
      });
    });
  }

  find(searchText) {
    return new Definition(this.baseURL, { headword: searchText });
  }

  getData() {
    http.get(this.baseURL + "/words.json", function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        var response = JSON.parse(body);
        callback(response);
      });
    });
  }
}
