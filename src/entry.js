import {Slugger} from './slugger';

export class Entry {
  constructor(baseURL, attributes) {
    Object.assign(this, attributes);
    this.slug = Slugger.slug(this.headword);
    this._url = baseURL + "/#" + this.slug;
  }

  get url()
  {
    return this._url;
  }

  matches(term) {
    return this.slug === Slugger.slug(term);
  }
}

