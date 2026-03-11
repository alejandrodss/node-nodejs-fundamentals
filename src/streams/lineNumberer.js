import { TransformStream } from 'node:stream/web';
import { pipeline } from 'node:stream/promises';

const lineNumberer = () => {
  // Write your code here
  // Read from process.stdin
  // Use Transform Stream to prepend line numbers
  // Write to process.stdout
  const lineNumberStream = new TransformStream({
    transform(chunk, controller) {
      const lines = chunk.toString().split('\n');
      lines.forEach((line, index) => {
        if (line) {
          controller.enqueue(`${index + 1} | ${line}\n`);
        }
      });
    }
  })
  pipeline(process.stdin, lineNumberStream, process.stdout);
};

lineNumberer();
