import {DefinitionRepository} from '../src/definition_repository';

describe('DefinitionRepository', function () {
  var definitionRepository;
  var promiseHelper;
  var words = {
    "GNU":
      {
        "headword":"GNU",
        "expansion":"GNU is not Unix",
        "definition":"The name “GNU” is a recursive acronym for “GNU's Not Unix.” “GNU” is pronounced g'noo, as one syllable, like saying “grew” but replacing the r with n",
        "links":null,
        "see_also":null
      }
  }

  beforeEach(function() {
    var fetchPromise = new Promise(function(resolve, reject) {
      promiseHelper = {
        resolve: resolve,
        reject: reject
      };
    });

    spyOn(window, 'fetch').and.returnValue(fetchPromise);

    definitionRepository = new DefinitionRepository();
  });

  describe("loading the remote list", () => {
    it('fetches from the CF Gloassary', function() {
      expect(window.fetch).toHaveBeenCalledWith('https://cf-glossary.cfapps.io/words.json', jasmine.anything());
    });

    describe('on successful fetch', function() {
      beforeEach(function() {
        var response = new Response(JSON.stringify(words));
        promiseHelper.resolve(response);
      });

      fit('once loaded it returns the definition', function() {
        definitionRepository.loaded.then(() => {
          var definition = definitionRepository.find("gnu")
          expect(definition.headword).toEqual("GNUaaaaa");
        });
      });
    });
  });
});

