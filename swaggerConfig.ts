import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
  openapi: '3.0.0',
    info: {
      title: 'crudlayer',
      description: 'API RESTful desenvolvida com Typescript como projeto de estudo e avaliação do bootcamp do Ifood em parceria com a ADATech, na modalidade back-end.',
      version: '1.0.0',
    },
    basePath: '/',
    components: {
      schemas: {
        User: {
          type: 'object',
          porperties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
          example:{
            id: 0,
            name: 'exemplo',
            email: 'exemplo@email.com'
          },
        },
        NewUser: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
          example: {
            message: 'Usuário criado com sucesso',
          },
        },
        UpdatedUser: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
          example: {
            message: 'Usuário atualizado com sucesso',
          },
        },
        DeletedUser: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
          example: {
            message: 'Usuário apagado com sucesso',
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
          example: {
            message: 'Erro interno do servidor',
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);


export default swaggerSpec;