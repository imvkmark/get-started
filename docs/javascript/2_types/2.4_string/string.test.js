const {isEmpty} = require("lodash");
test('字符串', () => {


    console.log(isEmpty('3333'))
    console.log(isEmpty({a: 1}))
    console.log(isEmpty(1))
})
