import 'core-js/fn/object';
import {Slugger} from 'slugger';

export class Entry {
    constructor(baseURL, attributes) {
        Object.assign(this, attributes);
        this.baseURL = baseURL;
    }

    get url() {
        return `${this.baseURL}/#${this.slug}`;
    }

    matches(term) {
        return this.slug === Slugger.slug(term);
    }

    set see_also(see_also) {
        this._see_also = see_also;
    }

    get slug() {
        return Slugger.slug(this.headword);
    }

    get see_also() {
        if (!this._see_also)
            return undefined;
        return this._see_also.map((seeAlso) => {
            return new Entry(this.baseURL, {headword: seeAlso});
        });
    }
}