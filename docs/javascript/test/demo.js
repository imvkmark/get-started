const { isNull } = require("lodash");

let str = "isjifiwerkkx8wlnfsai9sjalfnwl";

function getDigit(str) {
    let num = str.match(/[0-9]/);
    let digit;
    console.log(num);
    if (isNull(num)) {
        digit = 0;
    } else {
        digit = num[0];
    }
    return digit;
}

function lastStr(str) {
    str = str.split("").reverse().join("");
    let chars = str.match(/[a-z]/);
    let char;
    console.log(char);
    if (isNull(chars)) {
        char = "a";
    } else {
        char = chars[0];
    }
    return char;
}

console.log(getDigit(""));
console.log(getDigit("1"));
console.log(getDigit("12"));
console.log(getDigit("s52xlsijfljcij3"));
console.log(getDigit("-0"));

console.log(lastStr("s52xlsijfljcij3"));
console.log(lastStr("s52xlsijfljc3s"));

let username = "iDtag1t9rNzUWGpFojnrdwceow8TlkI8", code, strfull;
for (var i = username.length - 1; i >= 0; i--) {
    str = username.charAt(i);
    code = str.charCodeAt();
    strfull += code + ",";
}
console.log(strfull);
