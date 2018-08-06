import 'core-js/fn/object';
import {Entry} from './entry';

export class EntryRepository {
    constructor(baseURL = "https://cf-glossary.cfapps.io") {
        this.baseURL = baseURL;
        this.getData();
    }

    find(searchText) {
        return this.entries.find((def) => {
            return def.matches(searchText);
        });
    }

    all() {
        return this.entries;
    }

    getData() {
        var parsedResponse = JSON.parse(this._fetch());

        this.entries = Object.entries(parsedResponse).map(([key, value]) => {
            return new Entry(this.baseURL, value);
        });
    }

    _fetch() {
        var cache = CacheService.getScriptCache();
        var cached = cache.get("cf-glossary-words");

        if (cached != null) {
            return cached;
        }

        var response = UrlFetchApp.fetch(this.baseURL + "/words.json", {
            method: "get",
            muteHttpExceptions: true
        });

        var rawResponse = response.getContentText();
        cache.put("cf-glossary-words", rawResponse, 6000);
        return rawResponse;
    }

    newNotFoundEntry(searchTerm) {
        return new Entry(this.baseURL, {headword: searchTerm, definition: "No Entry Found"});
    }
}
