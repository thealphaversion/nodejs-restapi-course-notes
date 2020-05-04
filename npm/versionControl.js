// node_modules directory can grow very big
// so we should not add it to our repo

// we can generate the node_modules folder using the package.json file

// just do npm install on the command line

// to exclude node_modules from being tracked by git
// create or edit the file .gitignore
// 
// write node_modules/ to indicate it is a folder and that's it



/************************************************************************************************************************/

/**
 * ^4.3.6 here the ^ character is called the Caret character
 * 
 * To understand this, we need to understand semantic versioning
 * 
 * in our example,
 * 4 is the Major version
 * 3 is the Minor version
 * 6 is the Patch fix
 * 
 * the ^ character says the we're interested in any version of the package
 * as long as the Major version is 4
 * 
 * Then there's the Tilde '~'.
 * ~ indicates that we're interested in a package as long as the Major and Minor versions are the same as specified.
 * i.e. here any package version with 4.3.x would work.
 * 
 * And if there is no ^ or ~ then we want the exact same version.
 * 
 */

 // npm list --depth=0
 // this lists our dependencies and their versions