========================
CODE SNIPPETS
========================
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

----------------------------------------

TITLE: Install fs-extra
DESCRIPTION: Install the fs-extra package using npm. This command adds the library to your project's dependencies.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install fs-extra
```

----------------------------------------

TITLE: JavaScript: fs-extra moveSync Example
DESCRIPTION: Demonstrates the basic usage of fs-extra's moveSync function to move a file from one location to another.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/move-sync.md#_snippet_1

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra')

fs.moveSync('/tmp/somefile', '/tmp/does/not/exist/yet/somefile')
```

----------------------------------------

TITLE: Windows Testing Setup with Shared Folders
DESCRIPTION: Instructions for setting up a shared folder connection on Windows for testing Node.js applications, including mapping a network drive using the `net use` command. This is useful when developing on macOS or Linux and testing on a Windows VM.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/README.md#_snippet_7

LANGUAGE: Shell
CODE:
```
net use z: "\\vmware-host\Shared Folders"
```

----------------------------------------

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

----------------------------------------

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

----------------------------------------

TITLE: pathExists - node-fs-extra API and Examples
DESCRIPTION: Tests whether or not the given path exists by checking with the file system. It uses `fs.access` under the hood and provides a normal callback signature (err, exists). Supports Promise and async/await patterns.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/pathExists.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
pathExists(file[, callback])
  Tests whether or not the given path exists by checking with the file system.
  Uses `fs.access` under the hood.

  Parameters:
    - file <String>: The path to check.
    - callback <Function> (optional): A callback function that receives an error and a boolean indicating existence.
      - err <Error>: An error object if an error occurred.
      - exists <boolean>: True if the path exists, false otherwise.

  Returns:
    - Promise<boolean>: A Promise that resolves with a boolean indicating existence if no callback is provided.

  Example Usage:
    // With a callback:
    fs.pathExists('/tmp/file.txt', (err, exists) => {
      if (err) throw err;
      console.log(exists);
    })

    // Promise usage:
    fs.pathExists('/tmp/file.txt')
      .then(exists => console.log(exists))
      .catch(err => {
        throw err;
      })

    // With async/await:
    async function checkPath(f) {
      try {
        const exists = await fs.pathExists(f);
        console.log(exists);
      } catch (err) {
        throw err;
      }
    }
    checkPath('/tmp/file.txt');
```

LANGUAGE: javascript
CODE:
```
const fs = require('fs-extra');

const file = '/tmp/this/path/does/not/exist/file.txt';

// With a callback:
fs.pathExists(file, (err, exists) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Callback: ${exists}`); // => false
});

// Promise usage:
fs.pathExists(file)
  .then(exists => {
    console.log(`Promise: ${exists}`); // => false
  })
  .catch(err => {
    console.error(err);
  });

// With async/await:
async function example(f) {
  try {
    const exists = await fs.pathExists(f);
    console.log(`Async/Await: ${exists}`); // => false
  } catch (err) {
    console.error(err);
  }
}

example(file);
```

----------------------------------------

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

----------------------------------------

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

----------------------------------------

TITLE: fs-extra ensureDir API Reference
DESCRIPTION: Detailed API documentation for the `ensureDir` function, including its signature, parameters, options, aliases, and return values.

SOURCE: https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
ensureDir(dir[, options][, callback])

Ensures that the directory exists. If the directory structure does not exist, it is created.

**Aliases:** `mkdirs()`, `mkdirp()`

**Parameters:**

- `dir` `<String>`: The path to the directory to ensure.

- `options` `<Integer> | <Object>`: Optional. Can be an integer representing the mode or an object containing the mode.
  - If it is `Integer`, it will be used as the `mode`.
  - If it is `Object`, it should be `{ mode: <Integer> }`.

- `callback` `<Function>`: Optional. A callback function that is called upon completion.
  - `err` `<Error>`: An error object if an error occurred, otherwise `null`.

**Return Value:**

- If a callback is provided, it returns `undefined`.
- If no callback is provided, it returns a `Promise` that resolves when the directory is ensured or rejects if an error occurs.

**Error Conditions:**

- Permissions errors during directory creation.
- Invalid path or options.

**Related Methods:**

- `ensureDirSync`: Synchronous version of `ensureDir`.
- `ensureFile`: Ensures that a file exists.
- `ensureLink`: Ensures that a file exists and is hard linked.
- `ensureSymlink`: Ensures that a file exists and is symlinked.
```