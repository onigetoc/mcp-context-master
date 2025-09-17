================
CODE SNIPPETS
================
TITLE: Chain Zod String Methods
DESCRIPTION: Illustrates the chainable API of Zod for string manipulation, including setting minimum and maximum lengths, and converting to lowercase. This highlights Zod's developer-friendly design.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/zod.mdx#_snippet_1

LANGUAGE: typescript
CODE:
```
z.string()
  .min(5)
  .max(10)
  .toLowerCase();
```

--------------------------------

TITLE: Run Playground
DESCRIPTION: Executes the 'playground.ts' file and watches for changes, useful for experimentation.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/CONTRIBUTING.md#_snippet_6

LANGUAGE: javascript
CODE:
```
yarn play
```

--------------------------------

TITLE: Zod Basic Parse, Decode, Encode
DESCRIPTION: Demonstrates the basic usage of .parse(), .decode(), and .encode() with a simple Zod string schema. Shows that for basic schemas, input and output types are identical.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_0

LANGUAGE: ts
CODE:
```
const schema = z.string();

type Input = z.input<typeof schema>;    // string
type Output = z.output<typeof schema>;  // string

schema.parse("asdf");   // => "asdf"
schema.decode("asdf");  // => "asdf"
schema.encode("asdf");  // => "asdf"
```

LANGUAGE: ts
CODE:
```
const schema = z.string();

type Input = z.input<typeof schema>;    // string
type Output = z.output<typeof schema>;  // string

z.parse(schema, "asdf");   // => "asdf"
z.decode(schema, "asdf");  // => "asdf"
z.encode(schema, "asdf");  // => "asdf"
```

--------------------------------

TITLE: Zod Type-Safe Input Differences
DESCRIPTION: Illustrates the type-safety differences between .parse(), .decode(), and .encode() with a custom codec. Shows how .decode() and .encode() provide stricter type checking for inputs.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_2

LANGUAGE: ts
CODE:
```
const stringToDate = z.codec(
  z.iso.datetime(),
  z.date(),
  {
    decode: (isoString) => new Date(isoString),
    encode: (date) => date.toISOString(),
  }
);

stringToDate.parse(12345); 
// no complaints from TypeScript (fails at runtime)

stringToDate.decode(12345); 
// ❌ TypeScript error: Argument of type 'number' is not assignable to parameter of type 'string'.

stringToDate.encode(12345); 
// ❌ TypeScript error: Argument of type 'number' is not assignable to parameter of type 'Date'.
```

--------------------------------

TITLE: Build Zod
DESCRIPTION: Deletes the 'lib' directory and recompiles the 'src' directory to 'lib'.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/CONTRIBUTING.md#_snippet_3

LANGUAGE: javascript
CODE:
```
yarn build
```

--------------------------------

TITLE: Array Parsing Benchmark
DESCRIPTION: Benchmark results comparing Zod 3 and Zod 4 for array parsing. Demonstrates that Zod 4 is approximately 7.43x faster.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_3

LANGUAGE: text
CODE:
```
benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.array() parsing
------------------------------------------------- -----------------------------
zod3          147 µs/iter       (137 µs … 767 µs)    140 µs    246 µs    520 µs
zod4       19'817 ns/iter    (18'125 ns … 436 µs) 19'125 ns 44'500 ns    137 µs

summary for z.array() parsing
  zod4
   7.43x faster than zod3
```

--------------------------------

TITLE: Zod vs Zod Mini Chained Methods/Functions
DESCRIPTION: Illustrates how common schema operations like min, max, and trim are handled using functions in Zod Mini compared to methods in regular Zod.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/mini.mdx#_snippet_3

LANGUAGE: typescript
CODE:
```
// regular Zod
z.string().min(5).max(10).trim()

// Zod Mini
z.string().check(z.minLength(5), z.maxLength(10), z.trim());
```

--------------------------------

TITLE: String to Integer Codec
DESCRIPTION: A Zod codec to convert string representations of integers to JavaScript `number` type using `parseInt()`.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_14

LANGUAGE: ts
CODE:
```
const stringToInt = z.codec(z.string().regex(z.regexes.integer), z.int(), {
  decode: (str) => Number.parseInt(str, 10),
  encode: (num) => num.toString(),
});

stringToInt.decode("42");  // => 42
stringToInt.encode(42);    // => "42"
```

--------------------------------

TITLE: Safe Parsing with Zod
DESCRIPTION: Demonstrates the use of `.safeParse()` to avoid `try/catch` blocks. It returns a result object indicating success or failure with a `ZodError`.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/basics.mdx#_snippet_4

LANGUAGE: typescript
CODE:
```
const result = Player.safeParse({ username: 42, xp: "100" });
if (!result.success) {
  result.error;   // ZodError instance
} else {
  result.data;    // { username: string; xp: number }
}
```

--------------------------------

TITLE: Run Zod Build
DESCRIPTION: Builds the Zod project by deleting the 'lib' directory and recompiling the 'src' directory to 'lib'.

SOURCE: https://github.com/colinhacks/zod/blob/main/CONTRIBUTING.md#_snippet_2

LANGUAGE: bash
CODE:
```
pnpm build
```

--------------------------------

TITLE: Zod Mini vs Zod Functional API
DESCRIPTION: Demonstrates the functional API of Zod Mini compared to Zod's method-based API for common operations like optional, union, and extend.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_9

LANGUAGE: ts
CODE:
```
import * as z from "zod/mini";

z.optional(z.string());

z.union([z.string(), z.number()]);

z.extend(z.object({ /* ... */ }), { age: z.number() });
```

LANGUAGE: ts
CODE:
```
import * as z from "zod";

z.string().optional();

z.string().or(z.number());

z.object({ /* ... */ }).extend({ age: z.number() });
```

--------------------------------

TITLE: String to Number Codec
DESCRIPTION: A Zod codec to convert string representations of numbers to JavaScript `number` type using `parseFloat()`.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_13

LANGUAGE: ts
CODE:
```
const stringToNumber = z.codec(z.string().regex(z.regexes.number), z.number(), {
  decode: (str) => Number.parseFloat(str),
  encode: (num) => num.toString(),
});

stringToNumber.decode("42.5");  // => 42.5
stringToNumber.encode(42.5);    // => "42.5"
```

--------------------------------

TITLE: Parse Data with Zod
DESCRIPTION: Shows how to use the `.parse()` method on a Zod schema to validate input data. If the data is valid, it returns a strongly-typed deep clone of the input.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/basics.mdx#_snippet_1

LANGUAGE: typescript
CODE:
```
Player.parse({ username: "billie", xp: 100 }); 
// => returns { username: "billie", xp: 100 }
```

--------------------------------

TITLE: Number Validation Methods in Zod
DESCRIPTION: Demonstrates various number-specific validation methods in Zod, including greater than (`gt`), greater than or equal to (`gte`), less than (`lt`), less than or equal to (`lte`), positive, nonnegative, negative, nonpositive, and multiple of (`multipleOf`).

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_39

LANGUAGE: typescript
CODE:
```
z.number().gt(5);
z.number().gte(5);                     // alias .min(5)
z.number().lt(5);
z.number().lte(5);                     // alias .max(5)
z.number().positive();       
z.number().nonnegative();    
z.number().negative(); 
z.number().nonpositive(); 
z.number().multipleOf(5);              // alias .step(5)
```

--------------------------------

TITLE: Zod Codec with Async Decode/Encode
DESCRIPTION: Demonstrates creating a Zod codec that supports asynchronous decoding and encoding. The example shows a codec transforming a string to a number asynchronously.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_3

LANGUAGE: typescript
CODE:
```
const asyncCodec = z.codec(z.string(), z.number(), {
  decode: async (str) => Number(str),
  encode: async (num) => num.toString(),
});
```

--------------------------------

TITLE: Zod v4: Reduce TypeScript Instantiations with Extend
DESCRIPTION: Demonstrates how Zod v4 reduces TypeScript compiler instantiations compared to v3 when using chained .extend() operations on Zod objects. This optimization improves compilation times for complex schemas.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_5

LANGUAGE: typescript
CODE:
```
import * as z from "zod";

export const A = z.object({
  a: z.string(),
  b: z.string(),
  c: z.string(),
  d: z.string(),
  e: z.string(),
});

export const B = A.extend({
  f: z.string(),
  g: z.string(),
  h: z.string(),
});
```

LANGUAGE: typescript
CODE:
```
import * as z from "zod";

export const a = z.object({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const b = a.omit({
  a: true,
  b: true,
  c: true,
});

export const c = b.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const d = c.omit({
  a: true,
  b: true,
  c: true,
});

export const e = d.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const f = e.omit({
  a: true,
  b: true,
  c: true,
});

export const g = f.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const h = g.omit({
  a: true,
  b: true,
  c: true,
});

export const i = h.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const j = i.omit({
  a: true,
  b: true,
  c: true,
});

export const k = j.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const l = k.omit({
  a: true,
  b: true,
  c: true,
});

export const m = l.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const n = m.omit({
  a: true,
  b: true,
  c: true,
});

export const o = n.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});

export const p = o.omit({
  a: true,
  b: true,
  c: true,
});

export const q = p.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
```

--------------------------------

TITLE: Zod Top-Level String Formats
DESCRIPTION: Demonstrates the new top-level functions for string formats like email, UUID, IP addresses, URLs, and more. These are more concise and tree-shakable than the previous method equivalents.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_24

LANGUAGE: TypeScript
CODE:
```
z.email();
z.uuidv4();
z.uuidv7();
z.uuidv8();
z.ipv4();
z.ipv6();
z.cidrv4();
z.cidrv6();
z.url();
z.e164();
z.base64();
z.base64url();
z.jwt();
z.lowercase();
z.iso.date();
z.iso.datetime();
z.iso.duration();
z.iso.time();
```

--------------------------------

TITLE: Zod: Preprocess for Coerced Integer
DESCRIPTION: Shows how to use `z.preprocess` to convert string inputs to integers before applying further validation with `z.int()`.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_141

LANGUAGE: typescript
CODE:
```
const coercedInt = z.preprocess((val) => {
  if (typeof val === "string") {
    return Number.parseInt(val);
  }
  return val;
}, z.int());
```

--------------------------------

TITLE: Zod Transformers Syntax
DESCRIPTION: Demonstrates the new syntax for applying transformations in Zod 3 using the `.transform()` method on schemas. It shows how to chain transformations and refinements.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/MIGRATION.md#_snippet_0

LANGUAGE: typescript
CODE:
```
z.string().transform((val) => val.length);
```

LANGUAGE: typescript
CODE:
```
const test = z
  .string()
  .transform((val) => val.length)
  .refine((val) => val > 5, { message: "Input is too short" })
  .transform((val) => val * 2);

test.parse("12characters"); // => 24
```

--------------------------------

TITLE: tapiduck: Simple Typesafe JSON APIs
DESCRIPTION: tapiduck facilitates end-to-end typesafe JSON APIs using Zod and Express, offering a simpler alternative to tRPC.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_17

LANGUAGE: TypeScript
CODE:
```
import { createApi } from 'tapiduck';
import { z } from 'zod';

const api = createApi({
  routes: {
    '/hello': {
      method: 'get',
      response: z.string(),
    },
  },
});

// Example usage with Express:
// const app = express();
// api.applyRoutes(app);
// app.get('/hello', (req, res) => res.send('Hello World!'));
```

--------------------------------

TITLE: Zod Array Schema Definition
DESCRIPTION: Shows how to define an array schema using Zod. It illustrates the basic syntax for creating an array of strings and how to use the `.array()` method or its shorthand.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_86

LANGUAGE: TypeScript
CODE:
```
const stringArray = z.array(z.string()); // or z.string().array()
```

--------------------------------

TITLE: Support Zod 3 and Zod 4 Simultaneously
DESCRIPTION: Demonstrates how to import and use both Zod 3 and Zod 4 from their respective subpaths to support both versions concurrently. It also shows how to differentiate between Zod 3 and Zod 4 schemas at runtime by checking for the `_zod` property.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/library-authors.mdx#_snippet_2

LANGUAGE: typescript
CODE:
```
import * as z3 from "zod/v3";
import * as z4 from "zod/v4/core";

type Schema = z3.ZodTypeAny | z4.$ZodType;

function acceptUserSchema(schema: z3.ZodTypeAny | z4.$ZodType) {
  // ...
}
```

LANGUAGE: typescript
CODE:
```
import type * as z3 from "zod/v3";
import type * as z4 from "zod/v4/core";

declare const schema: z3.ZodTypeAny | v4.$ZodType;

if ("_zod" in schema) {
  schema._zod.def; // Zod 4 schema
} else {
  schema._def; // Zod 3 schema
}
```

--------------------------------

TITLE: Install Dependencies
DESCRIPTION: Installs project dependencies using Yarn.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/CONTRIBUTING.md#_snippet_2

LANGUAGE: sh
CODE:
```
yarn
```

--------------------------------

TITLE: Asynchronous Safe Parsing with Zod
DESCRIPTION: Explains the usage of `.safeParseAsync()` for schemas involving asynchronous operations, providing a safe way to handle validation results without explicit error catching.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/basics.mdx#_snippet_5

LANGUAGE: typescript
CODE:
```
await schema.safeParseAsync("hello");
```

--------------------------------

TITLE: Zod Mini vs Zod Refinements with .check()
DESCRIPTION: Compares the use of the .check() method in Zod Mini for applying multiple refinements to an array schema versus Zod's chained method calls.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_11

LANGUAGE: ts
CODE:
```
import * as z from "zod/mini";

z.array(z.number()).check(
  z.minLength(5), 
  z.maxLength(10),
  z.refine(arr => arr.includes(5))
);
```

LANGUAGE: ts
CODE:
```
import * as z from "zod";

z.array(z.number())
  .min(5)
  .max(10)
  .refine(arr => arr.includes(5));
```

--------------------------------

TITLE: Zod Benchmarking Command
DESCRIPTION: Provides the command to run Zod's TypeScript compiler benchmarks locally. This allows users to verify the performance improvements related to 'tsc' instantiations.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_6

LANGUAGE: bash
CODE:
```
cd packages/tsc
pnpm bench object-with-extend
```

--------------------------------

TITLE: String to BigInt Codec
DESCRIPTION: A Zod codec to convert string representations to JavaScript `bigint` type.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_15

LANGUAGE: ts
CODE:
```
const stringToBigInt = z.codec(z.string(), z.bigint(), {
  decode: (str) => BigInt(str),
  encode: (bigint) => bigint.toString(),
});

stringToBigInt.decode("12345");  // => 12345n
stringToBigInt.encode(12345n);   // => "12345"
```

--------------------------------

TITLE: Zod String Catch Behavior
DESCRIPTION: Demonstrates the `.catch()` method in Zod, which is only applied during the forward (decode) direction. Attempting to encode with an invalid type when `.catch()` is used results in an error.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_9

LANGUAGE: typescript
CODE:
```
const stringWithCatch = z.string().catch("hello");

stringWithCatch.decode(1234); 
// => "hello"

stringWithCatch.encode(1234); 
// => ZodError: Expected string, received number
```

--------------------------------

TITLE: domain-functions: Decoupled Business Logic
DESCRIPTION: This library helps decouple business logic from frameworks by using composable functions with end-to-end type inference powered by Zod schemas.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_14

LANGUAGE: TypeScript
CODE:
```
import { createDomainFunction } from 'domain-functions';
import { z } from 'zod';

const addNumbersSchema = z.object({
  a: z.number(),
  b: z.number(),
});

const addNumbers = createDomainFunction(addNumbersSchema, async ({ a, b }) => {
  return a + b;
});

// Usage example:
// const result = await addNumbers({ a: 5, b: 10 });
```

--------------------------------

TITLE: String Parsing Benchmark
DESCRIPTION: Benchmark results comparing Zod 3 and Zod 4 for string parsing. Shows that Zod 4 is approximately 14.71x faster.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_2

LANGUAGE: text
CODE:
```
benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.string().parse
------------------------------------------------- -----------------------------
zod3          363 µs/iter       (338 µs … 683 µs)    351 µs    467 µs    572 µs
zod4       24'674 ns/iter    (21'083 ns … 235 µs) 24'209 ns 76'125 ns    120 µs

summary for z.string().parse
  zod4
   14.71x faster than zod3
```

--------------------------------

TITLE: Support Zod and Zod Mini Simultaneously
DESCRIPTION: Explains how to build library code that imports from `zod/v4/core` to support both Zod and Zod Mini simultaneously. It shows how to create a function that accepts Zod schemas and how user code can utilize this function with both Zod and Zod Mini.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/library-authors.mdx#_snippet_3

LANGUAGE: typescript
CODE:
```
// library code
import * as z4 from "zod/v4/core";

export function acceptObjectSchema<T extends z4.$ZodObject>(schema: T){
  // parse data
  z4.parse(schema, { /* somedata */});
  // inspect internals
  schema._zod.def.shape;
}
```

LANGUAGE: typescript
CODE:
```
// user code
import { acceptObjectSchema } from "your-library";

// Zod 4
import * as z from "zod";
acceptObjectSchema(z.object({ name: z.string() }));

// Zod 4 Mini
import * as zm from "zod/mini";
acceptObjectSchema(zm.object({ name: zm.string() }))
```

--------------------------------

TITLE: Zod Parse Method
DESCRIPTION: This example shows the basic `.parse()` method in Zod, which validates and returns the data if successful, or throws an error if validation fails.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README_ZH.md#_snippet_17

LANGUAGE: typescript
CODE:
```
import { z } from "zod";

const IntSchema = z.number();

try {
  const result = IntSchema.parse(42);
  console.log("Parsed value:", result);
} catch (error) {
  console.error("Validation error:", error);
}

try {
  IntSchema.parse("hello");
} catch (error) {
  console.error("Validation error:", error);
}
```

--------------------------------

TITLE: Data Transformation with .transform
DESCRIPTION: Illustrates how to use the .transform method to modify data after it has been parsed by Zod. This example converts a string to its length.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README_ZH.md#_snippet_90

LANGUAGE: ts
CODE:
```
const stringToNumber = z.string().transform((val) => val.length);
stringToNumber.parse("string"); // => 6
```