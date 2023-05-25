const regex = /(https?:\/\/)?(www\.)?kejinshou\.com\/?([a-z0-9*-A-Z\/?=]*)/g;
const str = `将一个用户输入的一段文字中的url替换成可以点击的link地址。
测试一下：http://www.kejinshou.com紧接着中文，还有http://kejinshou.com 
is very good!https://kejinshou.com!最后在看看带.cn的：http://www.sina.com.cn呵呵。


http://www.kejinshou.com/
http://www.kejinshou.com/ssfsfsf
http://www.kejinshou.comwoca/hahha/nishou?adblkjlieljl
kejinshou.com
https://kejinshou.com`;
const subst = `<a href="https://kejinshou.com/$3">$0</a>`;

// The substituted value will be contained in the result variable
const result = str.replace(regex, function(a, b, c, d){
    console.log(a, b, c, d)
    return `<a href="https://kejinshou.com/${c}">${a}</a>`;
});

console.log("Substitution result: ", result);
