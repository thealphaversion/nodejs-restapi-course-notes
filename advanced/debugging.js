/**
 * const startupDebugger = require('debug')('app:startup');             // app:startup is a namespace given to the debug function for startup
 * const dbDebugger = require('debug')('app:db');                       // app:db is a namespace given to the debug function for database
 */

// We use environment variables to decide which namespace will be used.
// Debug basically replaces console.log() such that we only see those log messages as specified
// as the selected namespace 

// export DEBUG=app:startup                        // we'll see only those messages that are part of this namespace

// for multiple namespaces: export DEBUG=app:startup,app:export

// or app:* for all



