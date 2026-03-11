import { TransformStream } from 'node:stream/web';
import { pipeline } from 'node:stream/promises';

const filter = () => {
  // Write your code here
  // Read from process.stdin
  // Filter lines by --pattern CLI argument
  // Use Transform Stream
  // Write to process.stdout
  const patternArgIndex = process.argv.indexOf('--pattern');
  const pattern = patternArgIndex !== -1 && process.argv[patternArgIndex + 1] ? process.argv[patternArgIndex + 1] : null;
  if (!pattern) {
    console.error("Please specify a pattern using --pattern CLI argument");
    process.exit(1);
  }
  const filterStream = new TransformStream({
    transform(chunk, controller) {
      const lines = chunk.toString().split('\n');
      lines.forEach((line, index) => {
        if (line.includes(pattern)) {
          controller.enqueue(`${line}\n`);
        }
      });
    }
  })
  pipeline(process.stdin, filterStream, process.stdout);
};

filter();
