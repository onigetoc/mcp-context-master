================
CODE SNIPPETS
================
TITLE: Lint Code
DESCRIPTION: Checks the code for style adherence and best practices using npm.

SOURCE: https://github.com/motdotla/dotenv/blob/master/CONTRIBUTING.md#_snippet_3

LANGUAGE: bash
CODE:
```
npm run lint
```

--------------------------------

TITLE: Run Tests
DESCRIPTION: Executes the project's test suite using npm.

SOURCE: https://github.com/motdotla/dotenv/blob/master/CONTRIBUTING.md#_snippet_2

LANGUAGE: bash
CODE:
```
npm test
```

--------------------------------

TITLE: Project Setup and Contribution Workflow
DESCRIPTION: Standard Git commands for forking a repository, creating a feature branch, committing changes, and pushing to a remote branch.

SOURCE: https://github.com/motdotla/dotenv/blob/master/CONTRIBUTING.md#_snippet_0

LANGUAGE: bash
CODE:
```
git checkout -b my-new-feature
git commit -am "Added some feature"
git push origin my-new-feature
```

--------------------------------

TITLE: Parse .env Content
DESCRIPTION: Demonstrates how to use the dotenv.parse() method to parse a string or buffer containing environment variables into an object.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_4

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf)
console.log(typeof config, config)
```

--------------------------------

TITLE: Install Dependencies
DESCRIPTION: Installs project dependencies using npm.

SOURCE: https://github.com/motdotla/dotenv/blob/master/CONTRIBUTING.md#_snippet_1

LANGUAGE: bash
CODE:
```
npm install
```

--------------------------------

TITLE: Basic Usage
DESCRIPTION: Demonstrates how to load environment variables from a .env file into process.env using require('dotenv').config().

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_1

LANGUAGE: javascript
CODE:
```
require('dotenv').config()
console.log(process.env)
```

--------------------------------

TITLE: dotenv parse usage
DESCRIPTION: Shows how to use the `dotenv.parse()` function to parse the contents of a .env file directly. It accepts a String or Buffer and returns an object containing the parsed key-value pairs.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_20

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object
console.log(typeof config, config) // object { BASIC : 'basic' }
```

--------------------------------

TITLE: Parsing Environment Variables
DESCRIPTION: Provides an example of using the dotenv.parse() method to parse a string or buffer containing environment variables into an object. This is useful for custom parsing scenarios.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_4

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const buf = Buffer.from('BASICO=basico')
const config = dotenv.parse(buf) // devolverá un objeto
console.log(typeof config, config) // objeto { BASICO : 'basico' }
```

--------------------------------

TITLE: Install dotenv
DESCRIPTION: Instructions for installing the dotenv package using npm, yarn, bun, and pnpm.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install dotenv --save
yarn add dotenv
bun add dotenv
pnpm add dotenv
```

--------------------------------

TITLE: Basic Usage
DESCRIPTION: Demonstrates how to load environment variables from a .env file into process.env. Create a .env file in your project root and then require and configure dotenv as early as possible in your application.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_1

LANGUAGE: javascript
CODE:
```
require('dotenv').config()
console.log(process.env)
```

LANGUAGE: javascript
CODE:
```
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
```

--------------------------------

TITLE: Command Substitution Execution with dotenvx
DESCRIPTION: Shows the execution of a Node.js script utilizing command substitution managed by dotenvx. The output displays the DATABASE_URL with the result of the `whoami` command.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_9

LANGUAGE: javascript
CODE:
```
// index.js
console.log('DATABASE_URL', process.env.DATABASE_URL)
```

LANGUAGE: bash
CODE:
```
$ dotenvx run --debug -- node index.js
```

LANGUAGE: bash
CODE:
```
[dotenvx@0.14.1] injecting env (1) from .env
DATABASE_URL postgres://yourusername@localhost/my_database
```

--------------------------------

TITLE: dotenv config with multiple paths
DESCRIPTION: Shows how to provide an array of paths to `dotenv.config()`. The files are parsed in order, and variables are combined. The behavior of overriding existing variables depends on the `override` option.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_14

LANGUAGE: javascript
CODE:
```
require('dotenv').config({ path: ['.env.local', '.env'] })
```

--------------------------------

TITLE: Parsing .env content with Buffer
DESCRIPTION: Parses the content of a .env file from a Buffer and returns an object with the parsed values.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_11

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // returns an object
console.log(typeof config, config) // object { BASIC : 'basic' }
```

--------------------------------

TITLE: Variable Expansion Execution with dotenvx
DESCRIPTION: Illustrates the execution of a Node.js script that utilizes variable expansion managed by dotenvx. The output shows the expanded DATABASE_URL.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_7

LANGUAGE: javascript
CODE:
```
// index.js
console.log('DATABASE_URL', process.env.DATABASE_URL)
```

LANGUAGE: bash
CODE:
```
$ dotenvx run --debug -- node index.js
```

LANGUAGE: bash
CODE:
```
[dotenvx@0.14.1] injecting env (2) from .env
DATABASE_URL postgres://username@localhost/my_database
```

--------------------------------

TITLE: Populate Environment Variables
DESCRIPTION: Populates environment variables into a target object (e.g., process.env) from a parsed source. Allows customization of the target and source, with options to override existing variables and enable debugging.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_24

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const parsed = { HELLO: 'world' }

dotenv.populate(process.env, parsed)

console.log(process.env.HELLO) // world
```

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const parsed = { HELLO: 'universe' }
const target = { HELLO: 'world' } // empty object

dotenv.populate(target, parsed, { override: true, debug: true })

console.log(target) // { HELLO: 'universe' }
```

--------------------------------

TITLE: Dotenv Parsing Rules
DESCRIPTION: Explains the rules followed by the dotenv parser, including handling of assignments, comments, empty lines, whitespace, quotes, and multiline values.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_14

LANGUAGE: APIDOC
CODE:
```
Parsing Rules:
- `BASICO=basico` becomes `{BASICO: 'basico'}`
- Empty lines are skipped
- Lines starting with `#` are treated as comments
- `#` marks the start of a comment (unless the value is quoted)
- Empty values become empty strings (`VACIO=` becomes `{VACIO: ''}`)
- Internal quotes are preserved (`JSON={"foo": "bar"}` becomes `{JSON:"{\"foo\": \"bar\"}"}`)
- Whitespace is trimmed from both ends of unquoted values (`FOO=  algo ` becomes `{FOO: 'algo'}`)
- Single and double quoted values preserve surrounding whitespace (`FOO="  algo  "` becomes `{FOO: '  algo  '}`)
- Double-quoted values expand newlines (`MULTILINEA="nueva\nlínea"` becomes `{MULTILINEA: 'nueva\nlínea'}`)
- Backtick quoting is supported (`SIGNO_ACENTO=\`Esto tiene comillas 'simples' y "dobles" en su interior.\``)
```

--------------------------------

TITLE: Customizing dotenv with Plugins
DESCRIPTION: Demonstrates how to customize dotenv by expanding environment variables. It shows how to get the parsed .env object from dotenv.config() and pass it to dotenv-expand.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_26

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const variableExpansion = require('dotenv-expand')
const myEnv = dotenv.config()
variableExpansion(myEnv)
```

--------------------------------

TITLE: Install dotenv
DESCRIPTION: Installs the dotenv package locally using npm or yarn. This is the recommended way to add dotenv to your project.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_0

LANGUAGE: bash
CODE:
```
# local installation (recommended)
npm install dotenv --save

yarn add dotenv
```

--------------------------------

TITLE: Encrypting and Deploying with dotenvx
DESCRIPTION: Demonstrates how to encrypt .env files using dotenvx for secure deployment. It shows encrypting a file and then running a script using a provided private key.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_11

LANGUAGE: bash
CODE:
```
$ dotenvx set HELLO Production --encrypt -f .env.production
$ echo "console.log('Hello ' + process.env.HELLO)" > index.js

$ DOTENV_PRIVATE_KEY_PRODUCTION="<.env.production private key>" dotenvx run -- node index.js
[dotenvx] injecting env (2) from .env.production
Hello Production
```

--------------------------------

TITLE: Overriding Existing Environment Variables
DESCRIPTION: Demonstrates how to override existing environment variables using the `override` option in `dotenv.config()`.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_15

LANGUAGE: javascript
CODE:
```
require('dotenv').config({ override: true })
```

--------------------------------

TITLE: Managing Multiple Environments with dotenvx
DESCRIPTION: Illustrates how to load specific environment files using dotenvx. The examples show loading a single environment file and merging multiple environment files.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_10

LANGUAGE: bash
CODE:
```
$ echo "HELLO=production" > .env.production
$ echo "console.log('Hello ' + process.env.HELLO)" > index.js

$ dotenvx run --env-file=.env.production -- node index.js
Hello production
> ^^
```

LANGUAGE: bash
CODE:
```
$ echo "HELLO=local" > .env.local
$ echo "HELLO=World" > .env
$ echo "console.log('Hello ' + process.env.HELLO)" > index.js

$ dotenvx run --env-file=.env.local --env-file=.env -- node index.js
Hello local
```

--------------------------------

TITLE: Command Substitution with dotenvx
DESCRIPTION: Demonstrates using dotenvx for command substitution in .env files. The output of a shell command (e.g., `whoami`) can be embedded into a variable.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_8

LANGUAGE: ini
CODE:
```
# .env
DATABASE_URL="postgres://$(whoami)@localhost/my_database"
```

--------------------------------

TITLE: Example .env File
DESCRIPTION: An example of a .env file with environment variables, including multiline values and comments.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_3

LANGUAGE: dosini
CODE:
```
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...\nKh9NV...\n...\n-----END RSA PRIVATE KEY-----"

# This is a comment
SECRET_HASH="something-with-a-#-hash"
```

--------------------------------

TITLE: Comments
DESCRIPTION: Illustrates how to add comments to the .env file. Comments start with '#' and can be on their own line or at the end of a line. Values containing '#' must be enclosed in quotes.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_3

LANGUAGE: dosini
CODE:
```
# This is a comment
SECRET_KEY=YOURSECRETKEYGOESHERE # comment
SECRET_HASH="something-with-a-#-hash"
```

--------------------------------

TITLE: dotenv config usage
DESCRIPTION: Demonstrates the basic usage of the `dotenv.config()` function to load environment variables from a .env file into `process.env`. It also shows how to handle potential errors during loading and access the parsed variables.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_12

LANGUAGE: javascript
CODE:
```
const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)
```

--------------------------------

TITLE: Customizing Dotenv with Plugins
DESCRIPTION: Shows how to customize dotenv by using its returned object to integrate with plugins like `dotenv-expand` for variable expansion.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_17

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const variableExpansion = require('dotenv-expand')

const miEnv = dotenv.config()
variableExpansion(miEnv)
```

--------------------------------

TITLE: Alternativa: Precarga de dotenv con Node.js
DESCRIPTION: Este método permite precargar dotenv al iniciar la aplicación Node.js usando la bandera --require. No requiere una declaración de importación de dotenv dentro del código del script principal.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_21

LANGUAGE: javascript
CODE:
```
node --require dotenv/config index.js
```

--------------------------------

TITLE: Patrón incorrecto de importación de dotenv
DESCRIPTION: Este ejemplo ilustra un patrón de importación incorrecto que resulta en que `process.env.CLAVE_API` esté vacío. Esto ocurre porque dotenv.config() se llama después de que el módulo que depende de la variable de entorno ya ha sido cargado.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_19

LANGUAGE: javascript
CODE:
```
// notificarError.mjs
import { Cliente } from 'mejor-servicio-para-notificar-error'

export default new Client(process.env.CLAVE_API)

// index.mjs
import dotenv from 'dotenv'
dotenv.config()

import notificarError from './notificarError.mjs'
notificarError.report(new Error('ejemplo documentado'))
```

--------------------------------

TITLE: Preloading with require
DESCRIPTION: Explains how to use the --require (-r) command-line option to preload dotenv, eliminating the need to require and configure it within the application code. Configuration options can be passed via command-line arguments or environment variables.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_5

LANGUAGE: bash
CODE:
```
$ node -r dotenv/config tu_script.js

$ node -r dotenv/config tu_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true

$ DOTENV_CONFIG_<OPTION>=value node -r dotenv/config tu_script.js

$ DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config tu_script.js dotenv_config_path=/custom/path/to/.env
```

--------------------------------

TITLE: Multiline Values
DESCRIPTION: Shows how to define multiline environment variables, such as private keys, in the .env file. Supports literal newlines or escaped \n characters within double quotes.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_2

LANGUAGE: dosini
CODE:
```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END RSA PRIVATE KEY-----"
```

--------------------------------

TITLE: Patrón correcto de importación de dotenv con dependencia
DESCRIPTION: Este snippet muestra la forma correcta de manejar las dependencias de variables de entorno en módulos ES6. Asegura que dotenv.config() se ejecute antes de importar y usar módulos que dependen de las variables de entorno.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_20

LANGUAGE: javascript
CODE:
```
// notificarError.mjs
import { Cliente } from 'mejor-servicio-para-notificar-errores'

export default new Client(process.env.CLAVE_API)

// index.mjs
import * as dotenv from 'dotenv'
dotenv.config()

import notificarError from './notificarError.mjs'
notificarError.report(new Error('ejemplo documentado'))
```

--------------------------------

TITLE: Basic dotenv Configuration
DESCRIPTION: Loads environment variables from a .env file into process.env. Returns an object with 'parsed' content or an 'error' key.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_6

LANGUAGE: javascript
CODE:
```
const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)
```

--------------------------------

TITLE: dotenv config with custom path
DESCRIPTION: Illustrates how to specify a custom path to the .env file using the `path` option in `dotenv.config()`. This is useful when the .env file is not located in the current working directory.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_13

LANGUAGE: javascript
CODE:
```
require('dotenv').config({ path: '/custom/path/to/.env' })
```

--------------------------------

TITLE: dotenv example output
DESCRIPTION: Provides an example of the output when running a Node.js script that uses dotenv with debug logging enabled and a simple .env file.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_21

LANGUAGE: sh
CODE:
```
$ node index.js
[dotenv@17.0.0] injecting env (1) from .env
Hello World
```

--------------------------------

TITLE: Uso de dotenv con import en ESM
DESCRIPTION: Este snippet muestra la forma correcta de importar y configurar dotenv en un módulo ES6 (MJS). Asegura que las variables de entorno se carguen antes de que otros módulos las necesiten.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_18

LANGUAGE: javascript
CODE:
```
// index.mjs (ESM)
import * as dotenv from 'dotenv' // vea https://github.com/motdotla/dotenv#como-uso-dotenv-con-import
dotenv.config()
import express from 'express'
```

--------------------------------

TITLE: Integrating Dotenv with React
DESCRIPTION: Explains how to use dotenv with React projects, particularly when using `react-scripts` and the convention of prefixing variables with `REACT_APP_`.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_16

LANGUAGE: APIDOC
CODE:
```
React Integration:
- React code runs in Webpack, where `fs` and `process` might not be directly accessible.
- `process.env` can only be injected via Webpack configuration.
- For `react-scripts` (create-react-app), dotenv is built-in.
- Prefix environment variables with `REACT_APP_` for React to recognize them.
- Consult framework-specific documentation (Next.js, Gatsby) for client-side variable injection.
```

--------------------------------

TITLE: Using dotenvx with Docker
DESCRIPTION: Demonstrates how to integrate dotenvx into a Docker build process to manage environment variables securely. It includes steps for downloading dotenvx, setting up the prebuild hook, and running the application with dotenvx.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_30

LANGUAGE: bash
CODE:
```
# Dockerfile
...
RUN curl -fsS https://dotenvx.sh/ | sh
...
RUN dotenvx prebuild
CMD ["dotenvx", "run", "--", "node", "index.js"]
```

--------------------------------

TITLE: Parsing .env content with Debug Enabled
DESCRIPTION: Parses .env content with debug logging enabled to help diagnose issues with key-value pairs.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_12

LANGUAGE: javascript
CODE:
```
const dotenv = require('dotenv')
const buf = Buffer.from('hello world')
const opt = { debug: true }
const config = dotenv.parse(buf, opt)
// expect a debug message because the buffer is not KEY=VAL ready
```

--------------------------------

TITLE: Variable Expansion with dotenvx
DESCRIPTION: Shows how to use dotenvx for variable expansion in .env files. Variables defined in the environment or earlier in the .env file can be referenced and expanded within subsequent lines.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_6

LANGUAGE: ini
CODE:
```
# .env
USERNAME="username"
DATABASE_URL="postgres://${USERNAME}@localhost/my_database"
```

--------------------------------

TITLE: dotenv config with encoding option
DESCRIPTION: Explains how to specify the file encoding for the .env file using the `encoding` option in `dotenv.config()`. This is useful when your .env file uses an encoding other than the default 'utf8'.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_16

LANGUAGE: javascript
CODE:
```
require('dotenv').config({ encoding: 'latin1' })
```

--------------------------------

TITLE: dotenv .env file example
DESCRIPTION: A simple example of a .env file containing environment variables.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_22

LANGUAGE: ini
CODE:
```
# .env
.env
```

--------------------------------

TITLE: Using dotenv with ES Modules (ESM)
DESCRIPTION: Illustrates the correct way to use dotenv with ES Modules (ESM) in Node.js. It highlights the pitfall of importing dotenv after other modules and provides the correct import order.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_27

LANGUAGE: javascript
CODE:
```
// index.mjs (ESM)
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'
```

LANGUAGE: javascript
CODE:
```
import 'dotenv/config'

import errorReporter from './errorReporter.mjs'
```

--------------------------------

TITLE: ES6 Usage
DESCRIPTION: Shows how to use dotenv with ES6 import syntax for basic loading and for setting configuration options.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_2

LANGUAGE: javascript
CODE:
```
import 'dotenv/config'

import dotenv from 'dotenv'
dotenv.config({ path: '/custom/path/to/.env' })
```

--------------------------------

TITLE: Installing and Using dotenvx Git Pre-commit Hook
DESCRIPTION: Shows how to install the dotenvx CLI and set up the git pre-commit hook to prevent accidental commits of .env files. This ensures sensitive information is not exposed in the repository history.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_29

LANGUAGE: bash
CODE:
```
brew install dotenvx/brew/dotenvx
dotenvx precommit --install
```

--------------------------------

TITLE: dotenv config with processEnv option
DESCRIPTION: Demonstrates how to use the `processEnv` option in `dotenv.config()` to specify a custom object where environment variables should be loaded. This allows for loading variables into an object other than `process.env`.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README.md#_snippet_19

LANGUAGE: javascript
CODE:
```
const myObject = {}
require('dotenv').config({ processEnv: myObject })

console.log(myObject) // values from .env
console.log(process.env) // this was not changed or written to
```

--------------------------------

TITLE: dotenv Configuration with Custom Encoding
DESCRIPTION: Specifies the encoding of the .env file.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_8

LANGUAGE: javascript
CODE:
```
require('dotenv').config({ encoding: 'latin1' })
```

--------------------------------

TITLE: Troubleshooting .env loading with Debug Mode
DESCRIPTION: Enables debug mode in dotenv to help diagnose issues with loading .env files, providing more specific error messages.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_13

LANGUAGE: javascript
CODE:
```
require('dotenv').config({ debug: true })
```

--------------------------------

TITLE: dotenv Configuration with Override Enabled
DESCRIPTION: Overrides any environment variables that have already been set with values from the .env file.

SOURCE: https://github.com/motdotla/dotenv/blob/master/README-es.md#_snippet_10

LANGUAGE: javascript
CODE:
```
require('dotenv').config({ override: true })
```