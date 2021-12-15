const fs = require('fs');

const data = fs.readFileSync('../README.md');
console.log('1번', data.toString());