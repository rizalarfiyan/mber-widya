import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'
import { baseRegistry } from '@/api/base/base-route'
import { authRegistry } from '@/api/auth/auth-route'
import { vehicleRegistry } from '@/api/vehicle/vehicle-route'

export type OpenAPIDocument = ReturnType<OpenApiGeneratorV3['generateDocument']>

const documentGenerator = (): OpenAPIDocument => {
  const registry = new OpenAPIRegistry([baseRegistry, authRegistry, vehicleRegistry])

  registry.registerComponent('securitySchemes', 'accessToken', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'JSON Web Token (JWT) authentication',
  })

  const generator = new OpenApiGeneratorV3(registry.definitions)

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Widya Swagger API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  })
}

export default documentGenerator
