import {Definition} from './definition';

export class DefinitionRepository {
  constructor(baseURL = "https://cf-glossary.cfapps.io") {
    this.baseURL = baseURL;
  }

  find(searchText) {
    return new Definition(this.baseURL, searchText);
  }
}

