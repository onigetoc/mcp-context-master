### Working with Route Middleware

Source: https://github.com/expressjs/express/blob/master/examples/README.md

Demonstrates how to apply middleware to specific routes in Express.js. Middleware can be used for tasks like authentication, logging, or data validation before a route handler is executed.

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware function
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// Apply middleware to a specific route
app.get('/protected', requestLogger, (req, res) => {
  res.send('This route is protected by middleware!');
});

// Apply middleware to multiple routes
const adminMiddleware = (req, res, next) => {
  console.log('Admin access check...');
  // In a real app, you'd check user roles here
  next();
};

app.get('/admin/dashboard', adminMiddleware, (req, res) => {
  res.send('Welcome to the admin dashboard!');
});

// Middleware applied globally
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Route middleware example listening at http://localhost:${port}`);
});
```

--------------------------------

### Working with Error Middleware

Source: https://github.com/expressjs/express/blob/master/examples/README.md

Explains how to implement and use error-handling middleware in Express.js. This middleware is specifically designed to catch and process errors.

```javascript
const express = require('express');
const app = express();
const port = 3000;

// A regular middleware
app.use((req, res, next) => {
  console.log('Request received');
  next(); // Pass control to the next middleware
});

// A route that might throw an error
app.get('/throw-error', (req, res, next) => {
  // Simulate an error
  const error = new Error('This is a simulated error');
  error.status = 400;
  next(error);
});

// Error-handling middleware (must have 4 arguments)
app.use((err, req, res, next) => {
  console.error('Error caught:', err.message);
  res.status(err.status || 500).send(`An error occurred: ${err.message}`);
});

app.listen(port, () => {
  console.log(`Error middleware example listening at http://localhost:${port}`);
});
```

--------------------------------

### Express 3.x Global Error Handling Middleware Example

Source: https://github.com/expressjs/express/wiki/Migrating-from-2.x-to-3.x

This example illustrates how to implement a global error-handling middleware in Express 3.x. By defining a middleware function with four arguments (`err, req, res, next`) and placing it at the end of the middleware stack, it can catch errors passed via `next(err)` from preceding middleware. This allows for centralized error response handling, such as sending a 500 status with a custom error message.

```javascript
app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.session())
app.use(app.router) // the router itself (app.get(), app.put() etc)
app.use(function(err, req, res, next){
  // if an error occurs Connect will pass it down
  // through these "error-handling" middleware
  // allowing you to respond however you like
  res.send(500, { error: 'Sorry something bad happened!' });
})
```

--------------------------------

### Express.js Middleware Dependencies

Source: https://github.com/expressjs/express/blob/master/History.md

Lists the core middleware dependencies for Express.js versions, indicating which bundled middleware are included and which have been externalized.

```APIDOC
Bundled Middleware: Only 'static' middleware is bundled. All other bundled middleware have been removed.
```

--------------------------------

### Express Error Handling Middleware Setup

Source: https://github.com/expressjs/express/wiki/Migrating-from-2.x-to-3.x

Illustrates the correct placement and structure of error-handling middleware in Express. It must be defined after all other middleware and have four arguments to catch errors passed via `next(err)`.

```js
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session());
app.use(app.router);

app.use(function(err, req, res, next){
  res.send(500, { error: 'Sorry something bad happened!' });
});
```

--------------------------------

### Express.js: Fix router.use to accept array of middleware without path

Source: https://github.com/expressjs/express/blob/master/History.md

Corrects an issue where `router.use` did not properly accept an array of middleware functions when no path was specified. This enables more flexible middleware configuration.

```javascript
  * Fix `router.use` to accept array of middleware without path
```

--------------------------------

### Express.js Middleware Precedence Fix

Source: https://github.com/expressjs/express/blob/master/History.md

Addressed an issue with middleware precedence, ensuring that middleware functions are executed in the intended order.

```javascript
// Fixes potential issues where middleware might not be executed in the correct sequence.
```

--------------------------------

### Express Middleware Order in 4.x

Source: https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x

Illustrates the correct order of middleware and route definitions in Express 4.x after the removal of `app.router`.

```javascript
app.use(cookieParser());
app.use(bodyParser());
/// .. other middleware .. doesn't matter what

app.get('/' ...);
app.post(...);

// more middleware (executes after routes)
app.use(function(req, res, next) {});
// error handling middleware
app.use(function(err, res, next) {});
```

--------------------------------

### Removed express.query middleware

Source: https://github.com/expressjs/express/blob/master/History.md

The `express.query` middleware, used for parsing query strings, has been removed. Query string parsing is now handled internally.

```javascript
// Removed:
// app.use(express.query())
```

--------------------------------

### API: Middleware Error Handling

Source: https://github.com/expressjs/express/blob/master/History.md

Information regarding the removal of Express 3.x middleware error stubs.

```APIDOC
Middleware Error Stubs:
  - Express 3.x middleware error stubs have been removed.
  - Developers should ensure their middleware handles errors appropriately without relying on these stubs.
```

--------------------------------

### Express.js: Fix app.use to accept array of middleware without path

Source: https://github.com/expressjs/express/blob/master/History.md

Resolves a problem where `app.use` failed to accept an array of middleware functions when no path was provided. This improves the usability of `app.use` for array-based middleware.

```javascript
  * Fix `app.use` to accept array of middleware without path
```

--------------------------------

### Express.js Middleware Examples

Source: https://github.com/expressjs/express/wiki/Home

This section lists various middleware modules that extend Express functionality or provide useful utilities. These include session management, exposing objects to the client-side, flash message display, asynchronous configuration, resourceful routing, view helpers, autoloading scripts, error handling with source code injection, route grouping, module serving, route mapping, state sharing, named routes, pattern matching, and parameterized database queries.

```javascript
/* Connect middleware sessions in socket.io */
// Example usage would involve requiring and using the session.socket.io middleware.
```

```javascript
/* Expose js objects, functions, and modules to client-side scripts */
// Example: expressExpose(app, { myObject: { key: 'value' } });
```

```javascript
/* Flash message display dynamicHelper */
// Example: Requires integration with a session middleware and a view engine.
```

```javascript
/* Async configuration */
// Example: Configuration loading and application setup.
```

```javascript
/* Resourceful routing */
// Example: Defining routes for resources like users, posts, etc.
```

```javascript
/* Misc view helpers for Express */
// Example: Helper functions for rendering views.
```

```javascript
/* Autoload scripts (routes, models, controllers...) into application instance */
// Example: load('models').then('routes');
```

```javascript
/* Injects source code into Express 3 error stack */
// Example: Middleware to enhance error reporting.
```

```javascript
/* Plain javascript port of express-error with syntax highlighting */
// Example: Similar to express-error but with added syntax highlighting.
```

```javascript
/* Group express routes and middleware */
// Example: expressApp.group('/api', middleware, () => {
//   expressApp.get('/users', ...);
// });
```

```javascript
/* Middleware wrapper for google's module-server */
// Example: Integrating module-server with Express.
```

```javascript
/* Easy route mapping for Express */
// Example: Defining routes with clear path mappings.
```

```javascript
/* Share configuration and state data with the client-side */
// Example: expressState.expose(app, { config: {...} });
```

```javascript
/* Small library that let you name routes and easily create navigation components */
// Example: Naming routes for easier navigation generation.
```

```javascript
/* Pattern matching middleware for express */
// Example: Using switch statements or pattern matching for routing.
```

```javascript
/* Small utility to manually trigger (calling) express routes */
// Example: runMiddleware(req, res, nextFunction);
```

```javascript
/* An extended Router that accepts strings/objects and generates middleware */
// Example: router.query('SELECT * FROM users WHERE id = ?', [userId]);
```