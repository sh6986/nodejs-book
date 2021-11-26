const value = require('./var.js');  // ./ 하면은 현재 내가 있는 폴더
const { odd, even } = require('./var.js');  // 구조분해 할당도 가능

console.log(value);
console.log(odd, even);

function checkOddOrEven(number) {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}

module.exports = checkOddOrEven;

// module.exports = {
//     checkOddOrEven,
//     odd,
//     even,
// };

// module.exports 는 파일에서 단 한번만 사용해야 한다.
