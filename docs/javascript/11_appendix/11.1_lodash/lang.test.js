const {isEmpty} = require('lodash')

test('isEmpty', () => {
    // 字串: isEmpty false
    expect(isEmpty('3333')).toEqual(false);

    // Number isEmpty : true
    expect(isEmpty(1)).toEqual(true);
    expect(isEmpty(10)).toEqual(true);
})
