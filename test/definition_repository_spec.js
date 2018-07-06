import {DefinitionRepository} from '../src/definition_repository';

describe('DefinitionRepository', function () {
  var definitionRepository;

  beforeEach(function() {
  });

  describe("find", function() {
    it("returns a definition when found", function() {
      definitionRepository = new DefinitionRepository();
      var definition = definitionRepository.find("Define This");
      expect(definition).toBeDefined();
      expect(definition.slug()).toEqual("define-this");
    })
  });
});

