/**
 * Restful resource middleware for AdonisJs
 * 
 */

class Exception extends Error {
  constructor(name, message) {
    super()
    this.name = name
    this.message = message
  }
}

class ResourceMiddleware {
  async handle(ctx, next, params) {
    let [modelName = null, throwError = 'true'] = params
    ctx.resource = ctx.params.resource
    if (!modelName) {
      modelName = require('inflection').classify(ctx.resource)
    }
    try {
      ctx.Model = use(`App/Models/${modelName}`)
    } catch (e) {
      if (throwError === 'true') {
        throw new Exception('E_RESOURCE_MODEL_CLASS_NOT_FOUND', 'Model class file does not exists. ')
      }
    }
    if (ctx.Model && ctx.params.id) {
      try {
        ctx.model = await ctx.Model.findOrFail(ctx.params.id)
      } catch (e) {
        if (throwError === 'true') {
          throw new Exception('E_RESOURCE_MODEL_NOT_FOUND', 'Model dose not exists.')
        }
        console.error('Invalid model')
      }
    }
    await next()
  }
}

module.exports = new ResourceMiddleware