/**
 * REST is short for Representational State Transfer
 */

/**
 * Most applications follow the client-server architecture.
 * 
 * The application is the client (front end)
 * It needs to communicate with the server (back end)
 * 
 * It does so over the HTTP protocol.
 * On the server, we expose some services that are accessible using the http protocol.
 * The client can directly call this services using the http protocol.
 * 
 * REST is a convention used to build these services.
 */

/**
 * We use http protocol support to
 * create,
 * read,
 * update, and
 * delete data.
 * 
 * These operations together are called CRUD operations.
 */

/**
 * An endpoint example: http://vidly.com/api/customers
 * 
 * It can be http or https, use https if you need a secure channel for communication
 * 
 * most companies follow this convention of /api or api.domain.com to expose
 * their RESTful services. They include the word api somewhere in the address.
 * 
 * In the REST world the /customers part is reffered to as a resource
 * 
 * All CRUD operations for customers will be done by sending an http request to the /customers endpoint
 * for other stuff like movies it may be /movies
 */

 /**
  * Every http request has a verb or a method which determines its type or intention
  * 
  * Standard http methods
  * GET : for getting data
  * POST : for creating data
  * PUT : for updating data
  * DELETE : for deleting data
  */

/**
 * In our example,
 * 
 * GET
 * to get the list of all customers, we need to send a GET request to the /api/customers address
 * 
 * POST
 */