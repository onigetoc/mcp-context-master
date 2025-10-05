================
CODE SNIPPETS
================
TITLE: fs-extra outputFile Examples
DESCRIPTION: Demonstrates how to use the `outputFile` function with callbacks, Promises, and async/await syntax in Node.js.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile.md#_snippet_1

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra');

const file = '/tmp/this/path/does/not/exist/file.txt';
const content = 'hello!';

// Using callback:
fs.outputFile(file, content, err => {
  if (err) return console.error(err);
  console.log('File written successfully (callback)!');
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return console.error(err);
    console.log('File content (callback):', data);
  });
});

// Using Promises:
fs.outputFile(file, content)
  .then(() => {
    console.log('File written successfully (Promise)!');
    return fs.readFile(file, 'utf8');
  })
  .then(data => {
    console.log('File content (Promise):', data);
  })
  .catch(err => {
    console.error('Error (Promise):', err);
  });

// Using async/await:
async function writeAndRead(filePath, fileContent) {
  try {
    await fs.outputFile(filePath, fileContent);
    console.log('File written successfully (async/await)!');

    const data = await fs.readFile(filePath, 'utf8');
    console.log('File content (async/await):', data);
  } catch (err) {
    console.error('Error (async/await):', err);
  }
}

writeAndRead(file, content);
```

--------------------------------

TITLE: Basic File/Directory Copy
DESCRIPTION: Demonstrates the basic synchronous copy operation for both files and directories using fs-extra's copySync.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md#_snippet_1

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra');

// copy file
fs.copySync('/tmp/myfile', '/tmp/mynewfile');

// copy directory, even if it has subdirectories or files
fs.copySync('/tmp/mydir', '/tmp/mynewdir');
```

--------------------------------

TITLE: JavaScript: fs-extra moveSync Example
DESCRIPTION: Demonstrates the basic usage of fs-extra's moveSync function to move a file from one location to another.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/move-sync.md#_snippet_1

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

fs.moveSync('/tmp/somefile', '/tmp/does/not/exist/yet/somefile')
```

--------------------------------

TITLE: fs-extra Method Usage Examples (Async, Callback, Sync, Async/Await)
DESCRIPTION: Illustrates various ways to use fs-extra methods, specifically the 'copy' function. It covers asynchronous operations with promises, callbacks, synchronous execution, and async/await syntax.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/README.md#_snippet_3

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

// Async with promises:
fs.copy('/tmp/myfile', '/tmp/mynewfile')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))

// Async with callbacks:
fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
  if (err) return console.error(err)
  console.log('success!')
})

// Sync:
try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile')
  console.log('success!')
} catch (err) {
  console.error(err)
}

// Async/Await:
async function copyFiles () {
  try {
    await fs.copy('/tmp/myfile', '/tmp/mynewfile')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

copyFiles()
```

--------------------------------

TITLE: Copy File/Directory with Async/Await - fs-extra
DESCRIPTION: Shows how to use the fs-extra copy function with modern async/await syntax for cleaner asynchronous code. Errors are caught using a try...catch block.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md#_snippet_2

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

async function example () {
  try {
    await fs.copy('/tmp/myfile', '/tmp/mynewfile')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

example()
```

--------------------------------

TITLE: outputFileSync: Create directories and write file synchronously (Node.js)
DESCRIPTION: Writes data to a specified file path. If the parent directory does not exist, it will be created. The `file` argument must be a string path. The `data` can be a string, Buffer, or Uint8Array. Options are passed directly to `fs.writeFileSync`.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile-sync.md#_snippet_0

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra');

const file = '/tmp/this/path/does/not/exist/file.txt';
fs.outputFileSync(file, 'hello!');

const data = fs.readFileSync(file, 'utf8');
console.log(data); // => hello!
```

--------------------------------

TITLE: JavaScript: fs-extra moveSync with Overwrite
DESCRIPTION: Illustrates how to use the `overwrite` option with fs-extra's moveSync function to move a directory, replacing it if it already exists at the destination.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/move-sync.md#_snippet_2

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

fs.moveSync('/tmp/somedir', '/tmp/may/already/exist/somedir', { overwrite: true })
```

--------------------------------

TITLE: Move File/Directory with node-fs-extra (JavaScript)
DESCRIPTION: Demonstrates how to move files or directories using the `fs-extra` library in JavaScript. Supports callback, Promise, and async/await patterns.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/move.md#_snippet_0

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

const src = '/tmp/file.txt'
const dest = '/tmp/this/path/does/not/exist/file.txt'

// With a callback:
fs.move(src, dest, err => {
  if (err) return console.error(err)
  console.log('success!')
})
```

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

const src = '/tmp/file.txt'
const dest = '/tmp/this/path/does/not/exist/file.txt'

// With Promises:
fs.move(src, dest)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

async function example (src, dest) {
  try {
    await fs.move(src, dest)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

const src = '/tmp/file.txt'
const dest = '/tmp/this/path/does/not/exist/file.txt'
example(src, dest)
```

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

fs.move('/tmp/somedir', '/tmp/may/already/exist/somedir', { overwrite: true }, err => {
  if (err) return console.error(err)
  console.log('success!')
})
```

--------------------------------

TITLE: fs-extra API Reference
DESCRIPTION: Comprehensive documentation for fs-extra methods, categorized by asynchronous and synchronous operations. This includes file manipulation, JSON handling, and path existence checks.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/README.md#_snippet_4

LANGUAGE: APIDOC
CODE:
```
fs-extra Methods:

Async Methods:
- copy(src, dest[, opts]): Copies a file or directory. Returns a Promise.
- emptyDir(dir): Ensures that a directory is empty. Returns a Promise.
- ensureFile(file): Creates a file if it doesn't exist. Returns a Promise.
- ensureDir(dir): Creates a directory if it doesn't exist. Returns a Promise.
- ensureLink(srcpath, dstpath): Creates a hard link if it doesn't exist. Returns a Promise.
- ensureSymlink(srcpath, dstpath[, type]): Creates a symlink if it doesn't exist. Returns a Promise.
- mkdirp(dir): Alias for ensureDir. Returns a Promise.
- mkdirs(dir): Alias for ensureDir. Returns a Promise.
- move(src, dest[, opts]): Moves a file or directory. Returns a Promise.
- outputFile(file, data[, opts]): Creates a file with the given content. Returns a Promise.
- outputJson(file, data[, opts]): Creates a JSON file with the given content. Returns a Promise.
- pathExists(path): Checks if a path exists. Returns a Promise.
- readJson(file[, opts]): Reads and parses a JSON file. Returns a Promise.
- remove(path): Removes a file or directory. Returns a Promise.
- writeJson(file, object[, opts]): Writes an object to a JSON file. Returns a Promise.

Sync Methods:
- copySync(src, dest[, opts]): Synchronously copies a file or directory.
- emptyDirSync(dir): Synchronously ensures that a directory is empty.
- ensureFileSync(file): Synchronously creates a file if it doesn't exist.
- ensureDirSync(dir): Synchronously creates a directory if it doesn't exist.
- ensureLinkSync(srcpath, dstpath): Synchronously creates a hard link if it doesn't exist.
- ensureSymlinkSync(srcpath, dstpath[, type]): Synchronously creates a symlink if it doesn't exist.
- mkdirpSync(dir): Alias for ensureDirSync. Synchronously creates a directory.
- mkdirsSync(dir): Alias for ensureDirSync. Synchronously creates a directory.
- moveSync(src, dest[, opts]): Synchronously moves a file or directory.
- outputFileSync(file, data[, opts]): Synchronously creates a file with the given content.
- outputJsonSync(file, data[, opts]): Synchronously creates a JSON file with the given content.
- pathExistsSync(path): Synchronously checks if a path exists.
- readJsonSync(file[, opts]): Synchronously reads and parses a JSON file.
- removeSync(path): Synchronously removes a file or directory.
- writeJsonSync(file, object[, opts]): Synchronously writes an object to a JSON file.

Notes:
- All async methods return Promises if no callback is provided.
- Sync methods throw errors if an operation fails.
- Refer to individual method documentation (e.g., docs/copy.md) for detailed parameter descriptions and options.
```

--------------------------------

TITLE: ensureSymlink JavaScript Usage
DESCRIPTION: Demonstrates how to use the ensureSymlink function with callbacks, Promises, and async/await. This function ensures that a symbolic link exists, creating any necessary parent directories.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureSymlink.md#_snippet_0

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

const srcPath = '/tmp/file.txt'
const destPath = '/tmp/this/path/does/not/exist/file.txt'

// With a callback:
fs.ensureSymlink(srcPath, destPath, err => {
  console.log(err) // => null
  // symlink has now been created, including the directory it is to be placed in
})
```

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

const srcPath = '/tmp/file.txt'
const destPath = '/tmp/this/path/does/not/exist/file.txt'

// With Promises:
fs.ensureSymlink(srcPath, destPath)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

const srcPath = '/tmp/file.txt'
const destPath = '/tmp/this/path/does/not/exist/file.txt'

// With async/await:
async function example (src, dest) {
  try {
    await fs.ensureSymlink(src, dest)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

example(srcPath, destPath)
```

--------------------------------

TITLE: Running fs-extra Test Suite Commands
DESCRIPTION: Commands used for linting and running tests for the fs-extra project. These commands ensure code quality and test coverage across different environments.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/README.md#_snippet_5

LANGUAGE: bash
CODE:
```
npm run lint
# runs the linter (standard)
```

LANGUAGE: bash
CODE:
```
npm run unit
# runs the unit tests
```

LANGUAGE: bash
CODE:
```
npm run unit-esm
# runs tests for fs-extra/esm exports
```

LANGUAGE: bash
CODE:
```
npm test
# runs the linter and all tests
```

--------------------------------

TITLE: fs-extra outputFile API
DESCRIPTION: Documentation for the `outputFile` method in the `fs-extra` Node.js library, detailing its parameters, options, and behavior regarding directory creation.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
outputFile(file, data[, options][, callback])
  Writes data to a file, creating parent directories if they do not exist.

  Parameters:
    - file: `<String>` The path to the file. Must be a string path, not a buffer or file descriptor.
    - data: `<String> | <Buffer> | <Uint8Array>` The data to write to the file.
    - options: `<Object> | <String>` Optional. Same options as fs.writeFile.
    - callback: `<Function>` Optional. A callback function that is invoked when the operation completes.
      - err: `<Error>` An error object if an error occurred, otherwise null.

  Returns:
    - `<Promise>` If no callback is provided, a Promise is returned that resolves when the operation is complete or rejects on error.
```

--------------------------------

TITLE: APIDOC: fs-extra moveSync
DESCRIPTION: Synchronously moves a file or directory, supporting cross-device moves. It requires the source and destination paths, and accepts an options object for customization. The destination must match the type of the source (file to file, directory to directory).

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/move-sync.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
moveSync(src, dest[, options])

  Moves a file or directory, even across devices.

  - `src` <String>: The source file or directory path.
  - `dest` <String>: The destination path. Note: When `src` is a file, `dest` must be a file and when `src` is a directory, `dest` must be a directory.
  - `options` <Object> (Optional): Configuration options.
    - `overwrite` <boolean>: Overwrite existing file or directory. Defaults to `false`.

  Returns: void

  Example:
    // Move a file
    fs.moveSync('/tmp/somefile', '/tmp/does/not/exist/yet/somefile')

    // Move a directory with overwrite enabled
    fs.moveSync('/tmp/somedir', '/tmp/may/already/exist/somedir', { overwrite: true })
```

--------------------------------

TITLE: Copy File/Directory with Promises - fs-extra
DESCRIPTION: Illustrates using the fs-extra copy function with Promises for asynchronous operations. Success is handled in `.then()` and errors in `.catch()`.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md#_snippet_1

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

// With Promises:
fs.copy('/tmp/myfile', '/tmp/mynewfile')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

--------------------------------

TITLE: Copy with Filter Function
DESCRIPTION: Shows how to use a filter function with copySync to control which items are copied based on custom logic.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md#_snippet_2

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra');

const filterFunc = (src, dest) => {
  // your logic here
  // it will be copied if return true
};

fs.copySync('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc });
```

--------------------------------

TITLE: copySync(src, dest[, options]) API
DESCRIPTION: Synchronously copies a file or directory. Supports options for overwriting, error handling on existence, dereferencing symlinks, preserving timestamps, and filtering.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
copySync(src, dest[, options])

Synchronously copies a file or directory.

Parameters:
  src <String>: Path to the source file or directory. If src is a directory, its contents are copied, not the directory itself.
  dest <String>: Path to the destination. If src is a file, dest cannot be a directory.
  options <Object> (optional): Configuration options for the copy operation.
    overwrite <boolean>: Overwrite existing file or directory. Defaults to true. If false and destination exists, the operation silently fails unless errorOnExist is true.
    errorOnExist <boolean>: When overwrite is false and the destination exists, throw an error. Defaults to false.
    dereference <boolean>: Dereference symlinks. Defaults to false.
    preserveTimestamps <boolean>: Preserve original file timestamps. Defaults to false.
    filter <Function>: A function to filter copied files/directories. Return true to copy, false to ignore.
```

--------------------------------

TITLE: fs.write() Async/Await Usage (Node.js)
DESCRIPTION: Provides an example of fs.write() using async/await. It allows for cleaner handling of asynchronous file writing operations by destructuring the result object for bytesWritten and buffer.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/fs-read-write-writev.md#_snippet_3

LANGUAGE: javascript
CODE:
```
async function example () {
  const { bytesWritten, buffer } = await fs.write(fd, Buffer.alloc(length), offset, length, position)
}
```

--------------------------------

TITLE: writeJsonSync - Node.js JSON File Writing
DESCRIPTION: Synchronously writes a JavaScript object to a JSON file. It accepts the file path, the object to write, and optional configuration for JSON stringification (like spaces, EOL, replacer) and underlying file system write options. Requires the 'fs-extra' module.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson-sync.md#_snippet_0

LANGUAGE: javascript
CODE:
```
writeJsonSync(file, object[, options])

Alias: writeJSONSync()

Writes an object to a JSON file.

Parameters:
- file <String>: The path to the JSON file.
- object <Object>: The JavaScript object to write.
- options <Object>:
  - spaces <Number> | <String>: Number of spaces to indent; or a string to use for indentation. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument for more info.
  - EOL <String>: Set EOL character. Default is \n.
  - replacer [JSON replacer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter
  - Also accepts fs.writeFileSync() options (https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

Example:
const fs = require('fs-extra')

fs.writeJsonSync('./package.json', {name: 'fs-extra'})
```

--------------------------------

TITLE: fs.write() Promise Usage (Node.js)
DESCRIPTION: Illustrates the promise-based usage of the fs.write() method. The promise resolves with an object containing bytesWritten and the buffer. This is a common pattern for file writing operations in Node.js.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/fs-read-write-writev.md#_snippet_2

LANGUAGE: javascript
CODE:
```
fs.write(fd, buffer, offset, length, position)
  .then(results => {
    console.log(results)
    // { bytesWritten: 20, buffer: <Buffer 0f 34 5d ...> }
  })
```

--------------------------------

TITLE: Ensure Directory Creation with fs-extra (JavaScript)
DESCRIPTION: Demonstrates how to use the `ensureDir` function from `fs-extra` to create directories. It covers usage with callbacks, Promises, and async/await, including options for specifying the directory mode.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir.md#_snippet_0

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

const dir = '/tmp/this/path/does/not/exist'
const desiredMode = 0o2775
const options = {
  mode: 0o2775
}

// With a callback:
fs.ensureDir(dir, err => {
  console.log(err) // => null
  // dir has now been created, including the directory it is to be placed in
})

// With a callback and a mode integer
fs.ensureDir(dir, desiredMode, err => {
  console.log(err) // => null
  // dir has now been created with mode 0o2775, including the directory it is to be placed in
})

// With Promises:
fs.ensureDir(dir)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})

// With Promises and a mode integer:
fs.ensureDir(dir, desiredMode)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})

// With async/await:
async function example (directory) {
  try {
    await fs.ensureDir(directory)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}
example(dir)

// With async/await and an options object, containing mode:
async function exampleMode (directory) {
  try {
    await fs.ensureDir(directory, options)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}
exampleMode(dir)
```

--------------------------------

TITLE: fs.writev() Async/Await Usage (Node.js)
DESCRIPTION: Demonstrates the async/await usage for fs.writev(), which writes multiple buffers to a file descriptor. The result object contains bytesWritten and the array of buffers.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/fs-read-write-writev.md#_snippet_4

LANGUAGE: javascript
CODE:
```
async function example () {
  const { bytesWritten, buffers } = await fs.writev(fd, buffers, position)
}
```

--------------------------------

TITLE: Write JSON to File using writeJson
DESCRIPTION: The writeJson function in node-fs-extra writes a JavaScript object to a JSON file. It supports various options for indentation, end-of-line characters, and replacers, and can be used with callbacks, Promises, or async/await.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
/**
 * Writes an object to a JSON file.
 * Alias: writeJSON()
 *
 * @param {String} file The file path to write to.
 * @param {Object} object The object to write.
 * @param {Object} [options] Options for writing.
 *   - spaces {Number | String}: Number of spaces to indent; or a string to use for indentation.
 *   - EOL {String}: Set EOL character. Default is '\n'.
 *   - replacer {Function}: JSON replacer function.
 *   - Also accepts fs.writeFile() options.
 * @param {Function} [callback] Callback function.
 *   - err {Error}: An error if one occurred.
 */

// Example Usage:
const fs = require('fs-extra');

// With a callback:
fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
  if (err) return console.error(err);
  console.log('success!');
});

// With Promises:
fs.writeJson('./package.json', {name: 'fs-extra'})
.then(() => {
  console.log('success!');
})
.catch(err => {
  console.error(err);
});

// With async/await:
async function example () {
  try {
    await fs.writeJson('./package.json', {name: 'fs-extra'});
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

example();

```

--------------------------------

TITLE: node-fs-extra move API Reference
DESCRIPTION: Provides details on the `move` function signature, parameters, options, and behavior for moving files or directories.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/move.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
move(src, dest[, options][, callback])

  Moves a file or directory, even across devices.

  Parameters:
    - src <String>: The source file or directory path.
    - dest <String>: The destination path. Must match the type of src (file to file, directory to directory).
    - options <Object> (Optional): Configuration options.
      - overwrite <boolean>: If true, overwrites the destination if it already exists. Defaults to `false`.
    - callback <Function> (Optional): A callback function that is called upon completion or error.
      - err <Error>: An error object if the operation failed, otherwise null.

  Returns:
    - Promise: A Promise that resolves when the move operation is complete, or rejects on error.

  Notes:
    - If `dest` is a directory, `src` must also be a directory.
    - If `dest` is a file, `src` must also be a file.
    - If `overwrite` is `false` and `dest` exists, the operation will fail.

  Related Methods:
    - copy(src, dest[, options][, callback]): Copies a file or directory.
    - remove(path[, callback]): Removes a file or directory.
```