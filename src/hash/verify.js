import crypto from 'crypto'
import fs, { open } from 'fs/promises'
import stream from 'stream/promises';

const verify = async () => {
  // Read checksums.json
  // Calculate SHA256 hash using Streams API
  // Print result: filename — OK/FAIL
  const checksums = await fs.readFile('src/hash/checksums.json', 'utf8');
  const checksumsObj = JSON.parse(checksums);

  for (const [filename, expectedHash] of Object.entries(checksumsObj)) {
    const fileHandle = await open(`${process.cwd()}/src/hash/${filename}`);
    const fileStream = fileHandle.createReadStream();
    const hash = crypto.createHash('sha256');

    await stream.pipeline(fileStream, hash);
    const calculatedHash = hash.digest('hex');

    if (calculatedHash === expectedHash) {
      console.log(`${filename} — OK`);
    } else {
      console.log(`${filename} — FAIL`);
    }
    await fileHandle.close();
  }
};

await verify();
