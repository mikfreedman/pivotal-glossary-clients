import {Entry} from '../src/entry';

describe('Entry', function () {
    var entry;

    describe("matches", function () {
        it("returns true when the slug version matches", function () {
            entry = new Entry("http://example.com", {headword: "do^wn %trodden"});
            expect(entry.matches("down-trodden")).toBe(true);
        });
        it("returns false when the slugged version does not match", function () {
            entry = new Entry("http://example.com", {headword: "felix"});
            expect(entry.matches("down-trodden")).toBe(false);

            entry = new Entry("http://example.com", {headword: "felix cat"});
            expect(entry.matches("felixcat")).toBe(true);
        });
    });

    describe("URL", function () {
        it("returns the URL", function () {
            entry = new Entry("http://example.com", {headword: "do^wn %trodden"});
            expect(entry.url).toEqual("http://example.com/#downtrodden");
        });
    });

    describe("see_also", function () {
        describe("when there are no see also entries", () => {
            it("returns undefined", () => {
                entry = new Entry("http://example.com", {});
                expect(entry.see_also).toBeUndefined();
            });
        });

        describe("when there are see also entries", () => {
            it("returns an array of entries", function () {
                entry = new Entry("http://example.com", {see_also: ["word 1", "word2"]});
                expect(entry.see_also).toEqual([
                    new Entry("http://example.com", {headword: "word 1"}),
                    new Entry("http://example.com", {headword: "word2"})
                ]);
            });
        })
    });
});

