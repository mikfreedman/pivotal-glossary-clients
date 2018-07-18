import {Slugger} from './slugger';

export class Entry {
    constructor(baseURL, attributes) {
        Object.assign(this, attributes);
        this.slug = Slugger.slug(this.headword);
        this.baseURL = baseURL;
        this._url = baseURL + "/#" + this.slug;
    }

    get url() {
        return this._url;
    }

    matches(term) {
        return this.slug === Slugger.slug(term);
    }

    set see_also(see_also) {
        this._see_also = see_also;
    }

    get see_also() {
        if(!this._see_also)
            return undefined;
        return this._see_also.map((seeAlso) => {
            return new Entry(this.baseURL, {headword: seeAlso});
        });
    }
}

