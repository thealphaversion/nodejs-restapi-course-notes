/**
 * Node can be on different environments like development, production, etc.
 * 
 * The current environment can be found by,
 * 
 * process.env.NODE_ENV                 // this will be undefined if not set
 * or
 * app.get('env');                      // this will give development by default
 * 
 * 
 * To use this, we do
 * 
 * if (app.get('env') === 'development') {
 *      app.use(morgan('tiny'));
 * }
 */