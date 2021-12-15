const fs = require('fs').promises;

async function main() {
    let data = await fs.readFile('../README.txt');
    console.log('1번', data.toSring());
    data = await fs.readFile('../README.txt');
    console.log('2번', data.toSring());
    data = await fs.readFile('../README.txt');
    console.log('3번', data.toSring());
    data = await fs.readFile('../README.txt');
    console.log('4번', data.toSring());
}

main();
//
// fs.readFile('../README.txt')
//     .then((data) => {
//         console.log('1번', data.toString());
//         return fs.readFile('./readme.txt');
//     })
//     .then((data) => {
//         console.log('1번', data.toString());
//         return fs.readFile('./readme.txt');
//     })
//     .then((data) => {
//         console.log('1번', data.toString());
//         return fs.readFile('./readme.txt');
//     })
//     .then((data) => {
//         console.log('1번', data.toString());
//         return fs.readFile('./readme.txt');
//     })
//     .catch((err) => {
//         throw err;
//     });