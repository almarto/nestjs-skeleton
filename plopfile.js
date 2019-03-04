module.exports = function(plop) {
  /* Helpers */
  plop.addHelper('upperCase', function(text) {
    return text.toUpperCase();
  });

  const files = {
    DTO: 'plop-templates/DTO.js',
    entity: 'plop-templates/entity.js',
    controller: 'plop-templates/controller.js',
    moduleFile: 'plop-templates/module.js',
    service: 'plop-templates/service.js'
  };

  const createDto = {
    type: 'add',
    path: 'src/api/{{camelCase name}}/models/Create{{pascalCase name}}Dto.ts',
    templateFile: files.DTO
  };

  const createEntity = {
    type: 'add',
    path: 'src/api/{{camelCase name}}/{{camelCase name}}.entity.ts',
    templateFile: files.entity
  };

  const createController = {
    type: 'add',
    path: 'src/api/{{camelCase name}}/{{camelCase name}}.controller.ts',
    templateFile: files.controller
  };

  const createModule = {
    type: 'add',
    path: 'src/api/{{camelCase name}}/{{camelCase name}}.module.ts',
    templateFile: files.moduleFile
  };

  const createService = {
    type: 'add',
    path: 'src/api/{{camelCase name}}/{{camelCase name}}.service.ts',
    templateFile: files.service
  };

  /* Questions */
  var getEntityName = {
    type: 'input',
    name: 'name',
    message: 'What is the entity name?',
    validate: function(value) {
      if (/.+/.test(value)) {
        return true;
      }
      return 'name is required';
    }
  };

  /* Options */
  plop.setGenerator('api_entity', {
    description: 'Api Entity',
    prompts: [getEntityName],
    actions: [
      createDto,
      createEntity,
      createController,
      createModule,
      createService
    ]
  });
};
