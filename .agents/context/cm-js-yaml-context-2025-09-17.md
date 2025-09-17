================
CODE SNIPPETS
================
TITLE: Benchmark libyaml Parsing with Ruby (Psych)
DESCRIPTION: Measures the performance of libyaml for loading YAML data using Ruby's Psych library. It loads 'data.yml' via Psych.load_file.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/__wiki__/Other-languages-and-implementations.md#_snippet_5

LANGUAGE: bash
CODE:
```
time ruby -r psych -e "Psych.load_file 'data.yml'"
```

--------------------------------

TITLE: YAML Float Type Examples
DESCRIPTION: Demonstrates different ways to represent floating-point numbers in YAML, including canonical, exponential, fixed-point, infinity, and NaN.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_7

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/float.html
float:
  canonical: 6.8523015e+5
  exponentioal: 685.230_15e+03
  fixed: 685_230.15
  negative infinity: -.inf
  not a number: .NaN
```

--------------------------------

TITLE: YAML Map Type Examples
DESCRIPTION: Demonstrates the representation of unordered key-value pairs in YAML using both block style (indentation) and flow style (curly braces).

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_1

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/map.html
map:
  # Unordered set of key: value pairs. Block style:
  !!map Clark: Evans
  Ingy: döt Net
  Oren: Ben-Kiki
  # Flow style:
  !!map { Clark: Evans, Ingy: döt Net, Oren: Ben-Kiki }
```

--------------------------------

TITLE: Benchmark libyaml Parsing with Python
DESCRIPTION: Measures the performance of libyaml for loading YAML data using Python. It utilizes the CLoader from PyYAML to parse 'data.yml'.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/__wiki__/Other-languages-and-implementations.md#_snippet_2

LANGUAGE: bash
CODE:
```
time python -c "import yaml; from yaml import CLoader as Loader; yaml.load(open('data.yml'),Loader=Loader)"
```

--------------------------------

TITLE: Benchmark Syck Parsing with Ruby
DESCRIPTION: Measures the performance of Ruby's Syck parser for loading YAML data. It loads 'data.yml' using Syck.load_file.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/__wiki__/Other-languages-and-implementations.md#_snippet_6

LANGUAGE: bash
CODE:
```
time ruby -r syck -e "Syck.load_file('data.yml')"
```

--------------------------------

TITLE: YAML Type Formatting Styles
DESCRIPTION: Defines the available formatting styles for various standard YAML types, including null, integer, boolean, and float. This section details how different style keywords map to specific YAML output representations.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
YAML Type Styles:

!!null
  "canonical"   -> "~"
  "lowercase"   => "null"
  "uppercase"   -> "NULL"
  "camelcase"   -> "Null"
  "empty"       -> ""

!!int
  "binary"      -> "0b1", "0b101010", "0b1110001111010"
  "octal"       -> "0o1", "0o52", "0o16172"
  "decimal"     => "1", "42", "7290"
  "hexadecimal" -> "0x1", "0x2A", "0x1C7A"

!!bool
  "lowercase"   => "true", "false"
  "uppercase"   -> "TRUE", "FALSE"
  "camelcase"   -> "True", "False"

!!float
  "lowercase"   => ".nan", ".inf"
  "uppercase"   -> ".NAN", ".INF"
  "camelcase"   -> ".NaN", ".Inf"
```

--------------------------------

TITLE: Benchmark JSON Parsing with Node.js
DESCRIPTION: Measures the performance of native JSON parsing in Node.js for comparison. It reads a file named 'data.json' and parses its content using JSON.parse.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/__wiki__/Other-languages-and-implementations.md#_snippet_7

LANGUAGE: bash
CODE:
```
time node -e "var text=require('fs').readFileSync('data.json', 'utf-8'); JSON.parse(text);"
```

--------------------------------

TITLE: YAML Set Type Examples
DESCRIPTION: Demonstrates the representation of explicitly typed sets in YAML, where duplicate elements are ignored, shown in block and flow styles.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_4

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/set.html
set:
  # Explicitly typed set.
  baseball players: !!set ? Mark McGwire
                    ? Sammy Sosa
                    ? Ken Griffey
  # Flow style
  baseball teams: !!set { Boston Red Sox, Detroit Tigers, New York Yankees }
```

--------------------------------

TITLE: Benchmark libyaml Bindings with Node.js
DESCRIPTION: Measures the performance of Node.js with libyaml bindings for loading YAML data. It directly uses the libyaml module to read and parse 'data.yml'.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/__wiki__/Other-languages-and-implementations.md#_snippet_1

LANGUAGE: bash
CODE:
```
time node -e "require('libyaml').readFileSync('data.yml');"
```

--------------------------------

TITLE: Benchmark libyaml Parsing with PHP
DESCRIPTION: Measures the performance of libyaml for loading YAML data using PHP. It uses the yaml_parse_file function to process 'data.yml'.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/__wiki__/Other-languages-and-implementations.md#_snippet_4

LANGUAGE: bash
CODE:
```
time php -r 'yaml_parse_file("data.yml");'
```

--------------------------------

TITLE: Supported Standard YAML Types
DESCRIPTION: Lists the standard YAML tags and their corresponding JavaScript types. This includes basic types like null, boolean, integer, float, string, sequence (array), and mapping (object), as well as binary and timestamp types.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_9

LANGUAGE: APIDOC
CODE:
```
Standard YAML Types:

!!null ''                   # null
!!bool 'yes'                # bool
!!int '3...'                # number
!!float '3.14...'           # number
!!binary '...base64...'     # buffer
!!timestamp 'YYYY-...'      # date
!!omap [ ... ]              # array of key-value pairs
!!pairs [ ... ]             # array or array pairs
!!set { ... }               # array of objects with given keys and null values
!!str '...'                 # string
!!seq [ ... ]               # array
!!map { ... }               # object
```

--------------------------------

TITLE: YAML Integer Type Examples
DESCRIPTION: Shows various formats for representing integers in YAML, including decimal, octal, hexadecimal, and binary notations, with support for underscores as separators.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_8

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/int.html
int:
  canonical: 685230
  decimal: +685_230
  octal: 0o2472256
  hexadecimal: 0x_0A_74_AE
  binary: 0b1010_0111_0100_1010_1110
```

--------------------------------

TITLE: YAML Pairs Type Examples
DESCRIPTION: Illustrates the use of explicitly typed pairs in YAML, which allows duplicate keys within a sequence, shown in both block and flow styles.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_3

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/pairs.html
pairs:
  # Explicitly typed pairs.
  Block tasks: !!pairs
    - meeting: with team.
    - meeting: with boss.
    - break: lunch.
    - meeting: with client.
  Flow tasks: !!pairs [ meeting: with team, meeting: with boss ]
```

--------------------------------

TITLE: YAML Null Type Examples
DESCRIPTION: Demonstrates different ways to represent null values in YAML, including the canonical `~`, the keyword `null`, and empty values.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_10

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/null.html
null:
  # This mapping has four keys,
  # one has a value.
  empty:
  canonical: ~
  english: null
  ~: null
  key:
  # This sequence has five
  # entries, two have values.
  sparse:
    - ~
    - 2nd entry
    - 
    - 4th entry
    - Null
```

--------------------------------

TITLE: YAML Sequence Type Examples
DESCRIPTION: Shows how to represent ordered sequences of nodes in YAML using both block style (hyphens) and flow style (square brackets).

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_5

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/seq.html
seq:
  # Ordered sequence of nodes
  Block style:
  !!seq
    - Mercury # Rotates
    # - no light/dark sides.
    - Venus # Deadliest. Aptly named.
    - Earth # Mostly dirt.
    - Mars # Seems empty.
    - Jupiter # The king.
    - Saturn # Pretty.
    - Uranus # Where the sun hardly shines.
    - Neptune # Boring. No rings.
    - Pluto # You call this a planet?
  # Flow style:
  !!seq [ Mercury, Venus, Earth, Mars, # Rocks
          Jupiter, Saturn, Uranus, Neptune, # Gas
          Pluto ] # Overrated
```

--------------------------------

TITLE: Benchmark libyaml Parsing with Perl
DESCRIPTION: Measures the performance of libyaml for loading YAML data using Perl. It employs the YAML::XS module to load 'data.yml'.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/__wiki__/Other-languages-and-implementations.md#_snippet_3

LANGUAGE: bash
CODE:
```
time perl -MYAML::XS -e 'YAML::XS::LoadFile "data.yml"'
```

--------------------------------

TITLE: js-yaml dump Example Usage
DESCRIPTION: An example demonstrating how to use the dump function with custom options, specifically setting a style for null values and enabling key sorting.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_7

LANGUAGE: javascript
CODE:
```
dump(object, {
  'styles': {
    '!!null': 'canonical' // dump null as ~
  },
  'sortKeys': true        // sort object keys
});
```

--------------------------------

TITLE: Benchmark js-yaml Parsing with Node.js
DESCRIPTION: Measures the performance of js-yaml for loading YAML data using Node.js. It reads a file named 'data.yml' and parses its content.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/__wiki__/Other-languages-and-implementations.md#_snippet_0

LANGUAGE: bash
CODE:
```
time node -e "var yaml=require('js-yaml'), text=require('fs').readFileSync('data.yml', 'utf-8'); yaml.load(text);"
```

--------------------------------

TITLE: JS-YAML Load Options
DESCRIPTION: Details the available options for the `yaml.load` and `yaml.loadAll` functions, including schema types, error handling, and compatibility settings.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_5

LANGUAGE: APIDOC
CODE:
```
load (string [ , options ])

Parses `string` as single YAML document. Returns either a plain object, a string, a number, `null` or `undefined`, or throws `YAMLException` on error. By default, does not support regexps, functions and undefined.

options:
- `filename` _(default: null)_ - string to be used as a file path in error/warning messages.
- `onWarning` _(default: null)_ - function to call on warning messages. Loader will call this function with an instance of `YAMLException` for each warning.
- `schema` _(default: `DEFAULT_SCHEMA`)_ - specifies a schema to use.
  - `FAILSAFE_SCHEMA` - only strings, arrays and plain objects: https://www.yaml.org/spec/1.2/spec.html#id2802346
  - `JSON_SCHEMA` - all JSON-supported types: https://www.yaml.org/spec/1.2/spec.html#id2803231
  - `CORE_SCHEMA` - same as `JSON_SCHEMA`: https://www.yaml.org/spec/1.2/spec.html#id2804923
  - `DEFAULT_SCHEMA` - all supported YAML types.
- `json` _(default: false)_ - compatibility with JSON.parse behaviour. If true, then duplicate keys in a mapping will override values rather than throwing an error.

NOTE: This function **does not** understand multi-document sources, it throws exception on those.
NOTE: JS-YAML **does not** support schema-specific tag resolution restrictions. So, the JSON schema is not as strictly defined in the YAML specification. It allows numbers in any notation, use `Null` and `NULL` as `null`, etc. The core schema also has no such restrictions. It allows binary notation for integers.

loadAll (string [, iterator] [, options ])

Same as `load()`, but understands multi-document sources. Applies `iterator` to each document if specified, or returns array of documents.
```

--------------------------------

TITLE: Install JS-YAML for Node.js
DESCRIPTION: Installs the js-yaml package for use within a Node.js project via npm.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install js-yaml
```

--------------------------------

TITLE: Load YAML from String (Multiple Documents)
DESCRIPTION: Parses a string that may contain multiple YAML documents. It can apply an iterator function to each document or return an array of all parsed documents.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_4

LANGUAGE: javascript
CODE:
```
const yaml = require('js-yaml');

yaml.loadAll(data, function (doc) {
  console.log(doc);
});
```

--------------------------------

TITLE: JS-YAML CLI Usage
DESCRIPTION: Demonstrates the command-line interface usage for inspecting YAML files. It supports arguments for help, version, compact error display, and stack trace output.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_2

LANGUAGE: APIDOC
CODE:
```
usage: js-yaml [-h] [-v] [-c] [-t] file

Positional arguments:
  file           File with YAML document(s)

Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
  -c, --compact  Display errors in compact mode
  -t, --trace    Show stack trace on error
```

--------------------------------

TITLE: YAML String Type Example
DESCRIPTION: A simple example showing a basic string value in YAML.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_11

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/str.html
string: abcd
```

--------------------------------

TITLE: Google Analytics Tracking Snippet
DESCRIPTION: Standard JavaScript code for integrating Google Analytics tracking into a web page. It initializes the analytics object and tracks page views.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_0

LANGUAGE: JavaScript
CODE:
```
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-26895916-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
```

--------------------------------

TITLE: YAML Merge Key Examples
DESCRIPTION: Illustrates the merge key (`<<`) in YAML for combining multiple mappings into a single map, including overriding values and referencing anchors.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_9

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/merge.html
merge:
  - &CENTER { x: 1, y: 2 }
  - &LEFT { x: 0, y: 2 }
  - &BIG { r: 10 }
  - &SMALL { r: 1 }
  # All the following maps are equal:
  - # Explicit keys
    x: 1
    y: 2
    r: 10
    label: nothing
  - # Merge one map
    << : *CENTER
    r: 10
    label: center
  - # Merge multiple maps
    << : [ *CENTER, *BIG ]
    label: center/big
  - # Override
    << : [ *BIG, *LEFT, *SMALL ]
    x: 1
    label: big/left/small
```

--------------------------------

TITLE: Install JS-YAML CLI globally
DESCRIPTION: Installs the js-yaml package globally, making its command-line interface available system-wide.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_1

LANGUAGE: bash
CODE:
```
npm install -g js-yaml
```

--------------------------------

TITLE: YAML Ordered Map (omap) Examples
DESCRIPTION: Shows how to define explicitly typed ordered maps (dictionaries) in YAML, supporting both block and flow styles.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_2

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/omap.html
omap:
  # Explicitly typed ordered map (dictionary). Bestiary:
  !!omap
    - aardvark: African pig-like ant eater. Ugly.
    - anteater: South-American ant eater. Two species.
    - anaconda: South-American constrictor snake. Scaly.
  # Etc.
  # Flow style
  Numbers: !!omap [ one: 1, two: 2, three : 3 ]
```

--------------------------------

TITLE: JS-YAML Custom Type Usage Example
DESCRIPTION: Shows how a custom YAML type (`!sexy`) can be used within a YAML document to process sequence elements, as defined by a custom schema.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_14

LANGUAGE: YAML
CODE:
```
# Custom types
foobar: !sexy
  - bunny
  - chocolate
```

--------------------------------

TITLE: YAML Boolean Type Examples
DESCRIPTION: Illustrates various accepted representations for boolean values (true and false) in YAML, including different casing and common keywords.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_6

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/bool.html
bool:
  - true
  - True
  - TRUE
  - false
  - False
  - FALSE
```

--------------------------------

TITLE: JS-YAML Custom Type Definition Example
DESCRIPTION: Demonstrates how to define a custom YAML type (`!sexy`) in JavaScript using `jsyaml.Type` and `jsyaml.Schema.create` for custom data processing.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_13

LANGUAGE: JavaScript
CODE:
```
// JS-YAML allows you to specify a custom YAML types for your structures.
// This is a simple example of custom constructor defined in `js/demo.js` for
// custom `!sexy` type:

// var SexyYamlType = new jsyaml.Type('!sexy', {
//   kind: 'sequence',
//   construct: function (data) {
//     return data.map(function (string) { return 'sexy ' + string; });
//   }
// });

// var SEXY_SCHEMA = jsyaml.Schema.create([SexyYamlType]);

// result = jsyaml.load(yourData, { schema: SEXY_SCHEMA });
```

--------------------------------

TITLE: Caveats: JavaScript Object Keys in YAML
DESCRIPTION: Highlights a limitation where JavaScript does not allow objects or arrays as keys. When used in YAML, these are stringified via their `toString()` method, potentially leading to unexpected key representations in the parsed output.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_10

LANGUAGE: yaml
CODE:
```
---
? [ foo, bar ]
: - baz
? { foo: bar }
: - baz
  - baz
```

LANGUAGE: javascript
CODE:
```
{ "foo,bar": ["baz"], "[object Object]": ["baz", "baz"] }
```

--------------------------------

TITLE: YAML Timestamp Type Examples
DESCRIPTION: Illustrates various formats for representing timestamps in YAML, including ISO 8601, space-separated, and dates without time zones.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/support/demo_template/index.html#_snippet_12

LANGUAGE: YAML
CODE:
```
# http://yaml.org/type/timestamp.html
timestamp:
  canonical: 2001-12-15T02:59:43.1Z
  valid iso8601: 2001-12-14t21:59:43.10-05:00
  space separated: 2001-12-14 21:59:43.10 -5
  no time zone (Z): 2001-12-15 2:59:43.10
  date (00:00:00Z): 2002-12-14
```

--------------------------------

TITLE: Load YAML from String (Single Document)
DESCRIPTION: Parses a string containing a single YAML document. It returns the parsed data or throws a YAMLException on error. Supports options for filename, warning handling, schema selection, and JSON compatibility.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_3

LANGUAGE: javascript
CODE:
```
const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
try {
  const doc = yaml.load(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}
```

--------------------------------

TITLE: Caveats: Implicit Block Mapping Keys
DESCRIPTION: Illustrates a loading limitation in js-yaml concerning implicit block mapping keys. The provided YAML example, which uses anchors and duplicate keys, cannot be loaded due to these restrictions.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/README.md#_snippet_11

LANGUAGE: yaml
CODE:
```
&anchor foo:
  foo: bar
  *anchor: duplicate key
  baz: bat
  *anchor: duplicate key
```

--------------------------------

TITLE: js-yaml: Update internal module paths
DESCRIPTION: Internal module paths within the js-yaml library have been refactored in v4. References to files within the `/lib` directory need to be updated to reflect the new structure.

SOURCE: https://github.com/nodeca/js-yaml/blob/master/migrate_v3_to_v4.md#_snippet_5

LANGUAGE: javascript
CODE:
```
js-yaml v3:

```js
require('js-yaml/lib/js-yaml/common');
require('js-yaml/lib/js-yaml/type/int');
```

js-yaml v4:

```js
require('js-yaml/lib/common');
require('js-yaml/lib/type/int');
```
```