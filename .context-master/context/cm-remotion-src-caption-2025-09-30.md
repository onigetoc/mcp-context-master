================
CODE SNIPPETS
================
TITLE: Create TikTok Style Captions
DESCRIPTION: Demonstrates how to use createTikTokStyleCaptions to segment caption data into pages for animation. It shows the input caption structure and the resulting page structure, highlighting the `combineTokensWithinMilliseconds` option.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/captions/create-tiktok-style-captions.mdx#_snippet_0

LANGUAGE: tsx
CODE:
```
import {createTikTokStyleCaptions, Caption} from '@remotion/captions';

const captions: Caption[] = [
  {
    text: 'Using',
    startMs: 40,
    endMs: 300,
    timestampMs: 200,
    confidence: null,
  },
  {
    text: " Remotion's",
    startMs: 300,
    endMs: 900,
    timestampMs: 440,
    confidence: null,
  },
  {
    text: ' TikTok',
    startMs: 900,
    endMs: 1260,
    timestampMs: 1080,
    confidence: null,
  },
  {
    text: ' template,',
    startMs: 1260,
    endMs: 1950,
    timestampMs: 1600,
    confidence: null,
  },
];

const {pages} = createTikTokStyleCaptions({
  captions,
  combineTokensWithinMilliseconds: 1200,
});

/* pages: [
  {
    text: "Using Remotion's",
    startMs: 40,
    durationMs: 860,
    tokens: [
      {
        text: 'Using',
        fromMs: 40,
        toMs: 300,
      },
      {
        text: " Remotion's",
        fromMs: 300,
        toMs: 900,
      },
    ],
  },
  {
    text: 'TikTok template,',
    startMs: 900,
    durationMs: 1050,
    tokens: [
      {
        text: 'TikTok',
        fromMs: 900,
        toMs: 1260,
      },
      {
        text: ' template,',
        fromMs: 1260,
        toMs: 1950,
      },
    ],
  }
] */
```

--------------------------------

TITLE: Captioning Specific Video File with Node.js
DESCRIPTION: This Node.js command captions a single specified video file. Replace `<path-to-video-file>` with the actual path to the video you wish to caption.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/template-tiktok/README.md#_snippet_5

LANGUAGE: console
CODE:
```
node sub.mjs <path-to-video-file>
```

--------------------------------

TITLE: Generate Captions via CLI
DESCRIPTION: This command initiates the caption generation process for external recordings using a TypeScript script. Ensure your recording files are prefixed with 'webcam' for processing. The generated JSON caption files will be saved in the `public/<composition-id>/` directory.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/recorder/captions.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
bun sub.ts
```

--------------------------------

TITLE: parseSrt() Usage Example
DESCRIPTION: Demonstrates how to use the parseSrt() function to parse an SRT string into an array of Caption objects. The function takes an input string containing the SRT content and returns an object with a 'captions' property, which is an array of Caption items, each with start and end times in milliseconds, text content, and a confidence score.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/captions/parse-srt.mdx#_snippet_0

LANGUAGE: tsx
CODE:
```
import {parseSrt} from '@remotion/captions';

const input = `
1
00:00:00,000 --> 00:00:02,500
Welcome to the Example Subtitle File!

2
00:00:03,000 --> 00:00:06,000
This is a demonstration of SRT subtitles.

3
00:00:07,000 --> 00:00:10,500
You can use SRT files to add subtitles to your videos.
`.trim();

const {captions} = parseSrt({input});

/* captions = [
  {
    confidence: 1,
    endMs: 2500,
    startMs: 0,
    text: 'Welcome to the Example Subtitle File!',
    timestampMs: 1250,
  },
  {
    confidence: 1,
    endMs: 6000,
    startMs: 3000,
    text: 'This is a demonstration of SRT subtitles.',
    timestampMs: 4500,
  },
  {
    confidence: 1,
    endMs: 10500,
    startMs: 7000,
    text: 'You can use SRT files to add subtitles to your videos.',
    timestampMs: 8750,
  },
]
*/
```

--------------------------------

TITLE: Remotion Caption Item Type
DESCRIPTION: Captions are treated as a first-class item type within the Remotion Editor Starter, allowing them to be manipulated like other layers on the timeline and canvas.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/editor-starter/captioning.mdx#_snippet_2

LANGUAGE: APIDOC
CODE:
```
Caption Item Type:
  Description: Represents a caption track in Remotion.
  Properties:
    - text: The caption text.
    - start: The start time of the caption in milliseconds.
    - duration: The duration of the caption in milliseconds.
    - style: Optional styling properties for the caption.
  Usage:
    - Can be added to the timeline like video, image, or audio items.
    - Supports editing of individual tokens, typography, page duration, and word timings via the inspector.
```

--------------------------------

TITLE: serializeSrt() Example Usage
DESCRIPTION: Demonstrates how to use the serializeSrt function to convert an array of Caption objects into an SRT formatted string. The example shows the structure of the Caption object and how to pass it to the function.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/captions/serialize-srt.mdx#_snippet_0

LANGUAGE: tsx
CODE:
```
import {serializeSrt, Caption} from '@remotion/captions';

const captions: Caption[] = [
  {
    text: 'Welcome to the Example Subtitle File!',
    startMs: 0,
    endMs: 2500,
    timestampMs: 1250,
    confidence: 1,
  },
  {
    text: 'This is a demonstration of SRT subtitles.',
    startMs: 3000,
    endMs: 6000,
    timestampMs: 4500,
    confidence: 1,
  },
  {
    text: 'You can use SRT files to add subtitles to your videos.',
    startMs: 7000,
    endMs: 10500,
    timestampMs: 8750,
    confidence: 1,
  },
];

const lines = captions.map((caption) => [caption]);

const serialized = serializeSrt({lines});

/* serialized = `1
00:00:00,000 --> 00:00:02,500
Welcome to the Example Subtitle File!

2
00:00:03,000 --> 00:00:06,000
This is a demonstration of SRT subtitles.

3
00:00:07,000 --> 00:00:10,500
You can use SRT files to add subtitles to your videos.
`
*/
```

--------------------------------

TITLE: API Documentation for @remotion/captions
DESCRIPTION: Provides details on the `createTikTokStyleCaptions` function, its parameters, and return values. It explains the structure of `Caption` objects and the output `TikTokPage` objects, including tokenization and timing.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/captions/create-tiktok-style-captions.mdx#_snippet_1

LANGUAGE: APIDOC
CODE:
```
createTikTokStyleCaptions(options: {
  captions: Caption[];
  combineTokensWithinMilliseconds?: number;
}): {
  pages: TikTokPage[];
}

Caption:
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number;
  confidence: number | null;

TikTokPage:
  text: string;
  startMs: number;
  durationMs: number; // Available from v4.0.261
  tokens: {
    text: string;
    fromMs: number;
    toMs: number;
  }[];

Parameters:
  captions: An array of Caption objects representing the input text and timing.
  combineTokensWithinMilliseconds: Controls how closely tokens are grouped into pages. A higher value groups more words per page.

Return Value:
  pages: An array of TikTokPage objects, where each page contains segmented text and token information for animation.

Notes:
  - The `text` field in Caption objects is whitespace sensitive and should include leading spaces before words.
  - Apply `white-space: pre` CSS property to preserve spaces during rendering.
```

--------------------------------

TITLE: Caption Data Structure Definition
DESCRIPTION: Defines the structure of a caption object, including text, start and end times, timestamp, and confidence.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/captions/caption.mdx#_snippet_0

LANGUAGE: tsx
CODE:
```
import type {Caption} from '@remotion/captions';
//            ^?
```

--------------------------------

TITLE: parseSrt() API Documentation
DESCRIPTION: API documentation for the parseSrt() function. It details the input parameter and the structure of the returned captions.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/captions/parse-srt.mdx#_snippet_1

LANGUAGE: APIDOC
CODE:
```
parseSrt(options: {
  input: string;
}): {
  captions: Caption[];
}

Parameters:
  input: The contents of a .srt file as a string.

Return value:
  An object with the following properties:
    captions: An array of Caption items.
```

--------------------------------

TITLE: serializeSrt() API Documentation
DESCRIPTION: Provides details on the serializeSrt function's API, including its input parameters, return value, and how it processes caption data. It explains the structure of the 'lines' parameter, which is a two-dimensional array of Caption items, and how timestamps and text are handled.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/captions/serialize-srt.mdx#_snippet_1

LANGUAGE: APIDOC
CODE:
```
serializeSrt(options: {
  lines: Caption[][]
}): string

Parameters:
  options.lines: An two-dimensional array of Caption items. Each top-level item represents a line in the SubRip file. The second-level items represent the words in that line. Words get concatenated together during serialization. No spaces are added between the words. The start timestamp is determined from the startMs value of the first word in the line. The end timestamp is determined from the endMs value of the last word in the line. Arrays with no items will be ignored.

Return value:
A string in the SubRip format (.srt).

See also:
- Source code for this function: https://github.com/remotion-dev/remotion/blob/main/packages/captions/src/serialize-srt.ts
- @remotion/captions: /docs/captions
```

--------------------------------

TITLE: Captioning All Public Videos with Node.js
DESCRIPTION: This Node.js command processes all video files located in the `public` directory for captioning. It's used to automatically generate captions for multiple videos at once.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/template-tiktok/README.md#_snippet_4

LANGUAGE: console
CODE:
```
node sub.mjs
```

--------------------------------

TITLE: Captioning Videos in Specific Folder with Node.js
DESCRIPTION: This Node.js command captions all video files within a designated folder. Replace `<path-to-folder>` with the path to the directory containing the videos.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/template-tiktok/README.md#_snippet_6

LANGUAGE: console
CODE:
```
node sub.mjs <path-to-folder>
```

--------------------------------

TITLE: Using createTikTokStyleCaptions
DESCRIPTION: The createTikTokStyleCaptions function from the @remotion/captions package is used to automatically split captions into 'pages' for better on-screen presentation.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/editor-starter/captioning.mdx#_snippet_3

LANGUAGE: javascript
CODE:
```
import { createTikTokStyleCaptions } from "@remotion/captions";

// Assuming 'transcribedCaptions' is the output from an API or transcription service
const tiktokCaptions = createTikTokStyleCaptions(transcribedCaptions);

// 'tiktokCaptions' will be an array of caption objects, split into pages.
```

--------------------------------

TITLE: Generate Captions with toCaptions()
DESCRIPTION: This example demonstrates how to use the toCaptions() function to convert the output of transcribe() into a usable array of Caption objects. It shows the necessary imports, the transcription process, and the subsequent conversion to captions. The output is a structured array of caption objects, each containing text, start and end timestamps, and confidence scores.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/install-whisper-cpp/to-captions.mdx#_snippet_0

LANGUAGE: tsx
CODE:
```
import {toCaptions, transcribe} from '@remotion/install-whisper-cpp';
import path from 'path';

const whisperCppOutput = await transcribe({
  inputPath: '/path/to/audio.wav',
  whisperPath: path.join(process.cwd(), 'whisper.cpp'),
  whisperCppVersion: '1.5.5',
  model: 'medium.en',
  tokenLevelTimestamps: true,
});

const {captions} = toCaptions({
  whisperCppOutput,
});

console.log(captions);
```

--------------------------------

TITLE: OpenAI Whisper API Transformation
DESCRIPTION: Converts the output of the OpenAI Whisper API into an array of Caption objects, making it compatible with other Remotion caption APIs.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/openai-whisper/index.mdx#_snippet_0

LANGUAGE: javascript
CODE:
```
import { transformWhisperOutput } from "@remotion/openai-whisper";

// Assuming 'whisperApiResult' is the raw output from the OpenAI Whisper API
const captions = transformWhisperOutput(whisperApiResult);

```