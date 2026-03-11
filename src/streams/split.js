const split = async () => {
  // Write your code here
  // Read source.txt using Readable Stream
  // Split into chunk_1.txt, chunk_2.txt, etc.
  // Each chunk max N lines (--lines CLI argument, default: 10)
};

await split();

/**
 * split.js — implement function that reads file source.txt using a Readable Stream and splits it into chunk files: chunk_1.txt, chunk_2.txt, etc. Each chunk should contain at most N lines (N is given as a CLI argument --lines <number>, default: 10). Must use Streams API.
 */