import {Entry} from './entry';

export class EntryRepository {
    constructor(baseURL = "https://cf-glossary.cfapps.io") {
        this.baseURL = baseURL;
    }

    _find(searchText) {
        return this.entries.find((def) => {
            return def.matches(searchText);
        });
    }

    find(searchText) {
        if(!this.entries) {
            return this.getData().then(() => {
                return this._find(searchText);
            });
        } else {
            return new Promise((resolve) => { resolve(this._find(searchText)); });
        }
    }

    getData() {
        return fetch(this.baseURL + "/words.json", {
            method: 'get'
        }).then(response => {
            return response.json();
        }).then(response => {
            this.entries = Object.entries(response).map(([key, value]) => {
                return new Entry(this.baseURL, value);
            });
        });
    }

    newNotFoundEntry(searchTerm) {
        return new Entry(this.baseURL, {headword: searchTerm, definition: "No Entry Found"});
    }
}
