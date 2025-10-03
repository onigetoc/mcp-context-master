================
CODE SNIPPETS
================
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

TITLE: Captioning Features
DESCRIPTION: The Remotion Recorder provides advanced captioning capabilities, including word-level timings, avoidance of orphan words, and the ability to highlight technical terms using backticks. It integrates with Whisper.cpp for local caption generation and allows for easy correction of AI-generated captions.

SOURCE: https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/recorder/index.mdx#_snippet_1

LANGUAGE: javascript
CODE:
```
function fixCommonMisspellings(text) {
  // Example: Replace common misspellings
  return text.replace(/teh/g, 'the').replace(/adn/g, 'and');
}
```