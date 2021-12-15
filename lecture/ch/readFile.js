// const fs = require('fs');
//
// fs.readFile('../README.md', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data);  // 컴퓨터가 다루는 이진법 0101 이런식으로 바이너리 데이터. 이진법을 16진법으로 바꾼것
//     console.log(data.toString());
// });


// 프로미스 지원한다.
const fs = require('fs').promises;

fs.readFile('../README.md')
    .then((data) => {
        console.log(data);  // 컴퓨터가 다루는 이진법 0101 이런식으로 바이너리 데이터. 이진법을 16진법으로 바꾼것
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });
