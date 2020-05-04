// we use app.use() to install a middleware in the request processing pipeline

// to make a custom middleware we do

/**
 * 
 * app.use(function(req, res, next) {
 *      console.log("Logging...");
 *      next();                             // next is important because if we don't pass on the control from our middleware to the next or end the req-res cycle, out api will not work
 * });
 * 
 * app.use(function(req, res, next) {
 *      console.log("Authenticating...");
 *      next();                             // next is important because if we don't pass on the control from our middleware to the next or end the req-res cycle, out api will not work
 * });
 * 
 * 
 * We should not write all these middleware in the same file for best-practices purposes
 * Put them in a new file or module
 * 
 */

 // Adding lots of middleware decreases performance