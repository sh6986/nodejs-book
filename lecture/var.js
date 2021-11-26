const odd = '홀수입니다.';
const even = '짝수입니다.';

module.exports = {
    odd,
    even
};
// 보통 이렇게 객체로 많이 넘겨줌

// module.export = odd;
// module.export = [odd, even];

// module 생략 가능
// exports.odd = odd;
// exports.even = even;

// module.exports === exports === {} 같으므로 가능
// 그러나 함수는 불가능하다.

// ------
// exports.odd = odd;
// exports.even = even;

// module.exports = {};
// 같이 쓸 수 없다.
