================
CODE SNIPPETS
================
TITLE: Contrast Zod parse, decode, and encode methods for type safety
DESCRIPTION: This snippet highlights the difference in type safety between `parse()`, `decode()`, and `encode()` methods in Zod. While `parse()` accepts `unknown` and performs runtime validation, `decode()` and `encode()` enforce strongly-typed inputs at compile time, catching type mismatches before runtime. This ensures that inputs to transformation functions adhere to expected types, reducing potential errors.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_4

LANGUAGE: typescript
CODE:
```
stringToDate.parse(12345); 
// no complaints from TypeScript (fails at runtime)

stringToDate.decode(12345); 
// ❌ TypeScript error: Argument of type 'number' is not assignable to parameter of type 'string'.

stringToDate.encode(12345); 
// ❌ TypeScript error: Argument of type 'number' is not assignable to parameter of type 'Date'.
```

--------------------------------

TITLE: Demonstrate Zod parse, decode, and encode with simple string schema
DESCRIPTION: This snippet illustrates the basic usage of `.parse()`, `.decode()`, and `.encode()` methods on a simple `z.string()` schema in Zod. For schemas where input and output types are identical, these methods behave the same, showing no distinction between forward and backward transformations. The example also shows the type inference for input and output.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/codecs.mdx#_snippet_0

LANGUAGE: typescript
CODE:
```
const schema = z.string();

type Input = z.input<typeof schema>;    // string
type Output = z.output<typeof schema>;  // string

schema.parse("asdf");   // => "asdf"
schema.decode("asdf");  // => "asdf"
schema.encode("asdf");  // => "asdf"
```

LANGUAGE: typescript
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

TITLE: Run Zod Compiler Benchmarks (Shell)
DESCRIPTION: These shell commands provide instructions to navigate to the Zod repository's compiler benchmarking playground and execute a specific benchmark for object extension, allowing users to verify performance improvements.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_3

LANGUAGE: sh
CODE:
```
$ cd packages/tsc
$ pnpm bench object-with-extend
```

--------------------------------

TITLE: Compare Zod and Zod Mini for Optional/Nullable Schemas
DESCRIPTION: Illustrates the fundamental difference in API style between regular Zod (chained methods) and Zod Mini (functional approach). Both examples create a schema for an optional and nullable string, showing how Zod Mini prioritizes top-level functions for tree-shaking.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/mini.mdx#_snippet_1

LANGUAGE: ts
CODE:
```
// regular Zod
const mySchema = z.string().optional().nullable();
```

LANGUAGE: ts
CODE:
```
// Zod Mini
const mySchema = z.nullable(z.optional(z.string()));
```

--------------------------------

TITLE: Compare Zod Mini Functional API with Zod Method Chaining
DESCRIPTION: Illustrates the difference in API style between Zod Mini and standard Zod. Zod Mini uses wrapper functions for tree-shaking, while Zod uses method chaining for schema transformations like optional, union, and extend.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_7

LANGUAGE: typescript
CODE:
```
import * as z from "zod/mini";

z.optional(z.string());

z.union([z.string(), z.number()]);

z.extend(z.object({ /* ... */ }), { age: z.number() });
```

LANGUAGE: typescript
CODE:
```
import * as z from "zod";

z.string().optional();

z.string().or(z.number());

z.object({ /* ... */ }).extend({ age: z.number() });
```

--------------------------------

TITLE: Build Zod Project (pnpm)
DESCRIPTION: Executes the build process for the Zod project. This command deletes the existing `lib` directory and then recompiles the source code from `src` into `lib`.

SOURCE: https://github.com/colinhacks/zod/blob/main/CONTRIBUTING.md#_snippet_4

LANGUAGE: shell
CODE:
```
pnpm build
```

--------------------------------

TITLE: Build Zod Project Source Code
DESCRIPTION: Command to compile the Zod source code from the `src` directory to the `lib` directory. It first deletes any existing `lib` directory before recompiling.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/CONTRIBUTING.md#_snippet_2

LANGUAGE: sh
CODE:
```
yarn build
```

--------------------------------

TITLE: Compare Zod and Zod Mini for Schema Validation Checks
DESCRIPTION: Demonstrates how regular Zod uses chained methods like `.min()`, `.max()`, and `.trim()` for string validations, while Zod Mini employs a `check()` function with dedicated validation functions for improved tree-shaking efficiency.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/mini.mdx#_snippet_2

LANGUAGE: ts
CODE:
```
// regular Zod
z.string().min(5).max(10).trim()
```

LANGUAGE: ts
CODE:
```
// Zod Mini
z.string().check(z.minLength(5), z.maxLength(10), z.trim());
```

--------------------------------

TITLE: Execute Zod Playground for Experimentation
DESCRIPTION: Runs the `playground.ts` file, which is designed for experimentation and quick testing. The command watches for file changes, providing a live development feedback loop.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/CONTRIBUTING.md#_snippet_5

LANGUAGE: sh
CODE:
```
yarn play
```

--------------------------------

TITLE: Perform 'Env-Style' Boolean Coercion with Zod's Stringbool
DESCRIPTION: Demonstrates the `z.stringbool()` API for sophisticated boolean coercion from string inputs. It parses common truthy ('true', '1', 'yes') and falsy ('false', '0', 'no') representations, throwing a `ZodError` for unrecognised values.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_30

LANGUAGE: typescript
CODE:
```
const strbool = z.stringbool();

strbool.parse("true")         // => true
strbool.parse("1")            // => true
strbool.parse("yes")          // => true
strbool.parse("on")           // => true
strbool.parse("y")            // => true
strbool.parse("enabled")      // => true

strbool.parse("false");       // => false
strbool.parse("0");           // => false
strbool.parse("no");          // => false
strbool.parse("off");         // => false
strbool.parse("n");           // => false
strbool.parse("disabled");    // => false

strbool.parse(/* anything else */); // ZodError<[{ code: "invalid_value" }]>
```

--------------------------------

TITLE: Apply simple string transformations using Zod
DESCRIPTION: Examples of basic string transformation methods provided by Zod, such as `trim`, `toLowerCase`, `toUpperCase`, and `normalize`, available in both Zod and Zod Mini.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_12

LANGUAGE: typescript
CODE:
```
z.string().trim(); // trim whitespace
z.string().toLowerCase(); // toLowerCase
z.string().toUpperCase(); // toUpperCase
z.string().normalize(); // normalize unicode characters
```

LANGUAGE: typescript
CODE:
```
z.string().check(z.trim()); // trim whitespace
z.string().check(z.toLowerCase()); // toLowerCase
z.string().check(z.toUpperCase()); // toUpperCase
z.string().check(z.normalize()); // normalize unicode characters
```

--------------------------------

TITLE: Demonstrate TypeScript Structural Typing
DESCRIPTION: This basic TypeScript example illustrates structural typing, where two distinct types (`Cat`, `Dog`) are considered compatible if their structures (properties and their types) are the same, allowing assignment between them.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_141

LANGUAGE: ts
CODE:
```
type Cat = { name: string };
type Dog = { name: string };

const pluto: Dog = { name: "pluto" };
const simba: Cat = pluto; // works fine
```

--------------------------------

TITLE: Parse and Validate Data with Zod Mini
DESCRIPTION: Demonstrates the parsing and validation methods available in Zod Mini, which are consistent with standard Zod. These methods include synchronous and asynchronous parsing, as well as safe parsing which returns a result object without throwing an error.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/mini.mdx#_snippet_5

LANGUAGE: typescript
CODE:
```
import * as z from "zod/mini"

const mySchema = z.string();

mySchema.parse('asdf')
await mySchema.parseAsync('asdf')
mySchema.safeParse('asdf')
await mySchema.safeParseAsync('asdf')
```

--------------------------------

TITLE: Building Zod Library Functions for Zod/Zod Mini Compatibility (TypeScript)
DESCRIPTION: This TypeScript example illustrates how library code should import from `zod/v4/core` to ensure compatibility with both Zod and Zod Mini. The `acceptObjectSchema` function demonstrates parsing data and inspecting schema internals using the shared core interfaces.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/library-authors.mdx#_snippet_6

LANGUAGE: ts
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

--------------------------------

TITLE: Set Up Zod Development Environment
DESCRIPTION: Instructions for setting up a local development environment for Zod. This includes cloning your forked repository and installing project dependencies using `yarn`.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/CONTRIBUTING.md#_snippet_1

LANGUAGE: sh
CODE:
```
git clone git@github.com:{your_username}/zod.git
```

LANGUAGE: sh
CODE:
```
yarn
```

--------------------------------

TITLE: Parsing Data with Zod Schemas Using Top-Level Functions (TypeScript)
DESCRIPTION: This TypeScript function demonstrates parsing unknown data against a generic Zod schema. It utilizes the top-level `z.parse` function from Zod Core to safely parse the data and infer the correct output type of the schema, as schema subclass methods are not available in Zod Core.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/library-authors.mdx#_snippet_12

LANGUAGE: ts
CODE:
```
function parseData<T extends z4.$ZodType>(data: unknown, schema: T): z4.output<T> {
  return z.parse(schema, data);
}

parseData("sup", z.string());
// => string
```

--------------------------------

TITLE: Apply Number-Specific Validation Methods with Zod
DESCRIPTION: Lists various number-specific validation methods available in Zod, such as `gt`, `gte`, `lt`, `lte`, `int`, `positive`, `nonnegative`, `negative`, `nonpositive`, `multipleOf`, `finite`, and `safe`. These methods provide fine-grained control over numerical constraints.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_23

LANGUAGE: ts
CODE:
```
z.number().gt(5);
z.number().gte(5); // alias .min(5)
z.number().lt(5);
z.number().lte(5); // alias .max(5)

z.number().int(); // value must be an integer

z.number().positive(); //     > 0
z.number().nonnegative(); //  >= 0
z.number().negative(); //     < 0
z.number().nonpositive(); //  <= 0

z.number().multipleOf(5); // Evenly divisible by 5. Alias .step(5)

z.number().finite(); // value must be finite, not Infinity or -Infinity
z.number().safe(); // value must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
```

--------------------------------

TITLE: Demonstrate Chained Zod Schema Transformations (TypeScript)
DESCRIPTION: This TypeScript example illustrates a long chain of `.omit()` and `.extend()` operations on a Zod schema. It highlights how Zod 4 significantly improves compilation speed and avoids 'Possibly infinite' errors that were common in Zod 3 for such complex patterns.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_4

LANGUAGE: ts
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

TITLE: Zod Mini Example: Parsing a Boolean
DESCRIPTION: A minimal example showcasing how to define and parse a boolean schema using Zod Mini. This simple script is used as a benchmark to illustrate the bundle size reduction achieved by Zod Mini compared to regular Zod.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/mini.mdx#_snippet_3

LANGUAGE: ts
CODE:
```
z.boolean().parse(true)
```

--------------------------------

TITLE: Zod Array Length Constraints: .min(), .max(), .length()
DESCRIPTION: Shows how to apply length constraints to Zod array schemas using `.min()`, `.max()`, and `.length()`. These methods validate the number of items in an array, ensuring it meets minimum, maximum, or exact length requirements without changing the inferred type.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_61

LANGUAGE: ts
CODE:
```
z.string().array().min(5); // must contain 5 or more items
z.string().array().max(5); // must contain 5 or fewer items
z.string().array().length(5); // must contain 5 items exactly
```

--------------------------------

TITLE: Decoding with Zod's Top-Level z.decode() Function
DESCRIPTION: Zod provides a top-level `z.decode()` function as an alternative to the codec's `.parse()` method for performing the forward transform. Unlike `.parse()`, `z.decode()` expects a strongly-typed input, which can be beneficial for type safety. This example shows `z.decode()` converting an ISO date string into a Date object.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_126

LANGUAGE: ts
CODE:
```
z.decode(stringToDate, "2024-01-15T10:30:00.000Z"); // => Date
```

--------------------------------

TITLE: Execute General Development Commands for Zod Monorepo
DESCRIPTION: These pnpm commands provide general development functionalities for the Zod monorepo, including building all packages, running all tests, executing code in development mode, and applying linting and formatting fixes using Biome.

SOURCE: https://github.com/colinhacks/zod/blob/main/CLAUDE.md#_snippet_0

LANGUAGE: shell
CODE:
```
pnpm build
```

LANGUAGE: shell
CODE:
```
pnpm test
```

LANGUAGE: shell
CODE:
```
pnpm test:watch
```

LANGUAGE: shell
CODE:
```
pnpm dev
```

LANGUAGE: shell
CODE:
```
pnpm lint
```

LANGUAGE: shell
CODE:
```
pnpm format
```

LANGUAGE: shell
CODE:
```
pnpm fix
```

--------------------------------

TITLE: Execute and Watch Zod Play Script (pnpm)
DESCRIPTION: Executes the `play.ts` script, a useful environment for experimentation, and watches for any changes to the file, automatically restarting the script on modification.

SOURCE: https://github.com/colinhacks/zod/blob/main/CONTRIBUTING.md#_snippet_9

LANGUAGE: shell
CODE:
```
pnpm dev:play
```

--------------------------------

TITLE: Define and Constrain Zod Set Schemas with TypeScript
DESCRIPTION: Illustrates how to create a Zod schema for a Set of numbers and infer its TypeScript type. It then demonstrates applying various constraints like `nonempty()`, `min()`, `max()`, and `size()` to validate the number of items within a set.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_72

LANGUAGE: ts
CODE:
```
const numberSet = z.set(z.number());
type NumberSet = z.infer<typeof numberSet>;
// type NumberSet = Set<number>
```

LANGUAGE: ts
CODE:
```
z.set(z.string()).nonempty(); // must contain at least one item
z.set(z.string()).min(5); // must contain 5 or more items
z.set(z.string()).max(5); // must contain 5 or fewer items
z.set(z.string()).size(5); // must contain 5 items exactly
```

--------------------------------

TITLE: Parse Data Synchronously with Zod in TypeScript
DESCRIPTION: This snippet shows how to use the `.parse()` method to validate and parse data against a Zod schema. If the input is valid, it returns a strongly-typed, deep-cloned object; otherwise, it throws a ZodError.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/basics.mdx#_snippet_1

LANGUAGE: typescript
CODE:
```
Player.parse({ username: "billie", xp: 100 }); 
// => returns { username: "billie", xp: 100 }
```

--------------------------------

TITLE: New Zod 3 Transformer Syntax
DESCRIPTION: This example demonstrates the simplified transformer syntax introduced in Zod 3. The .transform() method can now be directly chained to any Zod schema, taking only the transformation function as an argument.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/MIGRATION.md#_snippet_1

LANGUAGE: typescript
CODE:
```
z.string().transform((val) => val.length);
```

--------------------------------

TITLE: General Primitive Coercion with Zod
DESCRIPTION: This example illustrates how Zod's `coerce` functionality for primitive types works by leveraging JavaScript's built-in constructors. It shows the methods used for coercing inputs to strings, numbers, booleans, bigints, and dates.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_5

LANGUAGE: ts
CODE:
```
z.coerce.string(); // String(input)
z.coerce.number(); // Number(input)
z.coerce.boolean(); // Boolean(input)
z.coerce.bigint(); // BigInt(input)
z.coerce.date(); // new Date(input)
```

--------------------------------

TITLE: Implement a Zod-Validated Function with Automatic Input/Output Checks
DESCRIPTION: Shows how to implement a function using the `.implement()` method of a Zod function schema. The resulting function automatically validates its inputs and outputs against the defined schema, providing type safety and runtime checks.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_150

LANGUAGE: ts
CODE:
```
const computeTrimmedLength = MyFunction.implement((input) => {
  // TypeScript knows input is a string!
  return input.trim().length;
});

computeTrimmedLength("sandwich"); // => 8
computeTrimmedLength(" asdf "); // => 4
```

--------------------------------

TITLE: Define Top-Level String Formats in Zod
DESCRIPTION: Demonstrates the new top-level functions for string formats like email, UUID, and URL in Zod 4, which are more concise and tree-shakable. This approach is preferred over the deprecated method equivalents (e.g., `z.string().email()`).

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_26

LANGUAGE: typescript
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

TITLE: Safely Parse Data with Zod in TypeScript
DESCRIPTION: This snippet demonstrates using the `.safeParse()` method to validate data without throwing exceptions. It returns a discriminated union, allowing convenient handling of either successful parsing (`result.data`) or validation errors (`result.error`) based on the `success` property.

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

TITLE: Enter Zod Directory (Shell)
DESCRIPTION: Navigates into the newly cloned Zod repository directory. This step is necessary before running other development commands.

SOURCE: https://github.com/colinhacks/zod/blob/main/CONTRIBUTING.md#_snippet_1

LANGUAGE: shell
CODE:
```
cd zod
```

--------------------------------

TITLE: Apply Date Validations (TypeScript)
DESCRIPTION: Demonstrates how to apply minimum and maximum date constraints using Zod schemas. This allows validating if a date falls within a specified range, with custom error messages.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_50

LANGUAGE: typescript
CODE:
```
z.date().min(new Date("1900-01-01"), { error: "Too old!" });
z.date().max(new Date(), { error: "Too young!" });
```

LANGUAGE: typescript
CODE:
```
z.date().check(z.minimum(new Date("1900-01-01"), { error: "Too old!" }));
z.date().check(z.maximum(new Date(), { error: "Too young!" }));
```

--------------------------------

TITLE: Perform Schema Parsing with Zod Mini
DESCRIPTION: Demonstrates how to use parsing methods like `parse`, `safeParse`, `parseAsync`, and `safeParseAsync` with Zod Mini. These methods are identical to standard Zod and allow validation and type coercion of data.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_8

LANGUAGE: typescript
CODE:
```
import * as z from "zod/mini";

z.string().parse("asdf");
z.string().safeParse("asdf");
await z.string().parseAsync("asdf");
await z.string().safeParseAsync("asdf");
```

--------------------------------

TITLE: Compose Zod Discriminated Unions for Nested Structures
DESCRIPTION: A new feature in Zod 4 allows discriminated unions to be composed, meaning one discriminated union can be a member of another. This greatly enhances the ability to model complex, nested data structures.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_36

LANGUAGE: typescript
CODE:
```
const BaseError = z.object({ status: z.literal("failed"), message: z.string() });

const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.discriminatedUnion("code", [
    BaseError.extend({ code: z.literal(400) }),
    BaseError.extend({ code: z.literal(401) }),
    BaseError.extend({ code: z.literal(500) })
  ])
]);
```

--------------------------------

TITLE: Constraining Input Schema by Inferred Output Type (TypeScript)
DESCRIPTION: This TypeScript example shows how to constrain a function's generic `T` to a Zod schema that produces a specific output type, like `string`. This allows for type-checking at compile time, preventing incompatible schema types from being passed to the function, as demonstrated by the error with `z.number()`.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/library-authors.mdx#_snippet_11

LANGUAGE: ts
CODE:
```

import * as z4 from "zod/v4/core";

// only accepts string schemas
function inferSchema<T extends z4.$ZodType<string>>(schema: T) {
  return schema;
}

inferSchema(z.string()); // ✅ 

inferSchema(z.number()); 
// ❌ The types of '_zod.output' are incompatible between these types. 
// // Type 'number' is not assignable to type 'string'
```