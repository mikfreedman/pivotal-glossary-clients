import {EntryRepository} from '../src/entry_repository';

describe('EntryRepository', function () {
    var entryRepository;
    var promiseHelper;
    var words = {
        "GNU":
            {
                "headword": "GNU",
                "expansion": "GNU is not Unix",
                "definition": "The name “GNU” is a recursive acronym for “GNU's Not Unix.” “GNU” is pronounced g'noo, as one syllable, like saying “grew” but replacing the r with n",
                "links": null,
                "see_also": null
            }
    }

    beforeEach(function () {
        var fetchPromise = new Promise(function (resolve, reject) {
            promiseHelper = {
                resolve: resolve,
                reject: reject
            };
        });

        spyOn(window, 'fetch').and.returnValue(fetchPromise);

        entryRepository = new EntryRepository();
    });

    describe("loading the remote list", () => {
        it('fetches from the CF Gloassary', function () {
            entryRepository.find("gnu").then(() => {
                expect(window.fetch).toHaveBeenCalledWith('https://cf-glossary.cfapps.io/words.json', jasmine.anything());
            });
        });

        describe('on successful fetch', function () {
            beforeEach(function () {
                var response = new Response(JSON.stringify(words));
                promiseHelper.resolve(response);
            });

            it('once loaded it returns the entry', function () {
                entryRepository.find("gnu").then((entry) => {
                    expect(entry.headword).toEqual("GNU");
                });
            });
        });
    });
});

