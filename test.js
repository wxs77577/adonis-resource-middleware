const test = require('japa')
const middleware = require('./index')

global.use = name => {
  name = name.split('/').pop()
  return {
    name: name,
    find(id) {
      return `${name}:${id}`
    }
  }
}

async function run(ctx, params = []) {
  const context = Object.assign({}, ctx)
  await middleware.handle(context, async () => { }, params)
  return context
}

const ctx = {
  params: {
    resource: 'products'
  }
}
// console.log('ctx =', JSON.stringify(ctx, null, 2))
test('ctx should has a `resource` property', async assert => {
  const newCtx = await run(ctx, [])
  assert.equal(newCtx.resource, 'products')
})
test('ctx should has a `Model` class', async assert => {
  const newCtx = await run(ctx, [])
  assert.equal(newCtx.Model.name, 'Product')
})
test('ctx should has a `model` object', async assert => {
  let newCtx = Object.assign({}, ctx)
  newCtx.params.id = 77577
  newCtx = await run(newCtx, [])
  assert.equal(newCtx.model, 'Product:77577')
})
test('specify a class name - User', async assert => {
  const newCtx = await run(ctx, ['User'])
  assert.equal(newCtx.Model.name, 'User')
})