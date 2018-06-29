# adonis-resource-middleware
Restful resource middleware for AdonisJs

## Usage
1. Install 
    ```bash
      npm i -S @tfs/adonis-resource-middleware
    ```
1. Edit `/start/kernel.js`
    ```javascript
    const namedMiddleware = {
      /* ... */
      /* add a named middleware */
      resource: '@tfs/adonis-resource-middleware',
    }
    ```

1. In your `/start/routes.js`:
    ```javascript
    Route.get('/api/:resource', async ({ Model }) => {
      /**
       * `Model` is the Model class of the requested resource
       * It convert the `:resource` in url parameters to single and camelcase class name
       * so `/users` route means `use('App/Models/User')`
       */
      return await Model.paginate(1, 10)
    }).middleware(['resource'])

    /* Specify the resource name */
    Route.get('/api/users').middleware(['resource:users'])

    /* The 2nd param specify if throw exceptions automatically */
    Route.get('/api/users').middleware(['resource:users,false'])

    /* Also you can ignore the 1st param */
    Route.get('/api/:resource').middleware(['resource:,false'])
    

    Route.get('/api/:resource/:id', async ({ model }) => {
      /**
       * `model` is the model instace of the requested resource
       */
      return model
    }).middleware(['resource'])

    /* also you can use `Route.resource` */
    Route.resource('/api/:resource', 'ResourceController').middleware(['resource'])
    ```

## Handle Exceptions

It throws exceptions by default, also you can handle it, please check [The Official Docs of Handling Exceptions.](https://www.adonisjs.com/docs/4.1/exceptions#_handling_exceptions)

1. `E_RESOURCE_MODEL_CLASS_NOT_FOUND`
  If the model class does not exists in `App/Models/`.

1. `E_RESOURCE_MODEL_NOT_FOUND` 
  If the record does not exists in the database.