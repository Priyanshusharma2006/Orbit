import { parseOffice } from 'officeparser';
import fs from 'fs';

async function test() {
  fs.writeFileSync('test.txt', 'This is a test document about biology. Mitochondria is the powerhouse of the cell.');
  try {
    const text = await parseOffice('test.txt');
    console.log("TEXT PARSED:", text);
  } catch(e) {
    console.error("ERROR:", e);
  }
}
test();
