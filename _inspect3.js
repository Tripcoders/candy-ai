const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
// 1. how many inline white backgrounds? (card targeting without new "framer" strings)
console.log('inline background-color:rgb(255, 255, 255) count:', (html.match(/background-color:rgb\(255,\s*255,\s*255\)/g)||[]).length);
// 2. Menu column rules: find .framer-1pxnqot and .framer-17rfvfk CSS
for (const cls of ['framer-1pxnqot','framer-17rfvfk','framer-108dfri','framer-vpzfas']) {
  const m = html.match(new RegExp('\\.'+cls+'\\{[^}]{0,400}'));
  console.log('--- .'+cls+':', m ? m[0].slice(0,400) : 'RULE NOT IN SSR CSS (runtime-generated)');
}
// 3. footer link appearance: sample a footer link node
const li = html.indexOf('Meet Characters');
console.log('--- footer link ctx:', JSON.stringify(html.slice(Math.max(0,li-300), li+100)).slice(0,460));
// 4. dir=auto coverage on text
const pTotal = (html.match(/<p\b/g)||[]).length;
const pDir = (html.match(/<p\b[^>]*dir="auto"/g)||[]).length;
console.log('p tags:', pTotal, 'with dir=auto:', pDir);
