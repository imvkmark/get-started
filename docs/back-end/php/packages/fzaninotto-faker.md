---
description: 'Faker库的格式化器模块提供多种数据生成分类，包括基础文本、人物、地址、电话号码、公司、日期时间、互联网、用户代理、支付、颜色、文件、图片、UUID、条形码及各种杂项和偏向数据，并支持修改器定制输出。'
lastUpdated: '2026-06-18 08:37:41'
head:
  - - meta
    - name: 'og:title'
      content: '[译+] fzaninotto_Faker 文档'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Faker库的格式化器模块提供多种数据生成分类，包括基础文本、人物、地址、电话号码、公司、日期时间、互联网、用户代理、支付、颜色、文件、图片、UUID、条形码及各种杂项和偏向数据，并支持修改器定制输出。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/packages/fzaninotto-faker.html'
---
# [译+] fzaninotto_Faker 文档

原文地址: [Faker](https://github.com/fzaninotto/Faker)

## Formatters 格式化器

Faker 可以通过访问您想要的数据类型的属性来生成数据

每个生成器属性 (例如 name, address, lorem) 都被称谓 "formatters". 一个 faker 生成器有很多, 打包在 `Provider`  
中。下面是默认区域中绑定的格式化程序的列表。

### Base 基本

```PHP
//生成随机整数 0 - 9
$randomDigit = $this->faker()->randomDigit; // 0
//生成随机不为空的整数
$randomDigitNotNull = $this->faker()->randomDigitNotNull; // 8
//生成随机数字
$randomNumber = $this->faker()->randomNumber($nbDigits = NULL, $strict = false); // 3487065
//生成随机浮点数
$randomFloat = $this->faker()->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = NULL); // 45.013726488
//在指定范围内生成随机数
$numberBetween = $this->faker()->numberBetween($min = 1000, $max = 9000); // 1027
//生成随机字符
$randomLetter = $this->faker()->randomLetter; // k
//在给定的数组中,随机生成给定的个数字符
$randomElements = $this->faker()->randomElements($array = array('a', 'b', 'c'), $count = 2); // array('c', 'a')
//在给定的数组中,生成单个随机字符
$randomElement = $this->faker()->randomElement($array = array('a', 'b', 'c')); // "b"
//打乱给定的字符串
$shuffleStr = $this->faker()->shuffle('hello, world'); // 'rlo,h eoldlw'
//打乱给定的数组
$shuffleArr = $this->faker()->shuffle(array(1, 2, 3)); // array(2, 1, 3)
//给占位符生成随机整数 (数字为#)
$numerify = $this->faker()->numerify('Hello ###'); // 'Hello 609'
//给占位符生成随机字符串 (字符串为?)
$lexify = $this->faker()->lexify('Hello ???'); // 'Hello wgt'
//给占位符生成混合的随机字符串
$bothify = $this->faker()->bothify('Hello ##??'); // 'Hello 42jz'
//给占位符生成随机的字符(字母、数字、符号)
$asciify = $this->faker()->asciify('Hello ***'); // 'Hello R6+'
//根据正则规则生成随机字符
$regexify = $this->faker()->regexify('[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}'); // "NXF@QJ87.XDR"
```

### Lorem 文本

```PHP
//生成随机个数的字符串
$word = $this->faker()->word; // 'aut'
//随机生成指定个数的字符串
$words = $this->faker()->words($nb = 3, $asText = false); // array('porro', 'sed', 'magni')
//随机生成一条语句
$sentence = $this->faker()->sentence($nbWords = 6, $variableNbWords = true); // 'Sit vitae voluptas sint non voluptates.'
//随机生成指定条数的语句
//参数 $asText是否作为文本, false:为数组,true:为一个字符串
$sentences = $this->faker()->sentences($nb = 3, $asText = false); // array('Optio quos qui illo error.', 'Laborum vero a officia id corporis.', 'Saepe provident esse hic eligendi.')
//随机生成一个段落
$paragraph = $this->faker()->paragraph($nbSentences = 3, $variableNbSentences = true); // 'Ut ab voluptas sed a nam. Sint autem inventore aut officia aut aut blanditiis. Ducimus eos odit amet et est ut eum.'
//随机生成指定个数段落
$paragraphs = $this->faker()->paragraphs($nb = 3, $asText = false); // array('Quidem ut sunt et quidem est accusamus aut. Fuga est placeat rerum ut. Enim ex eveniet facere sunt.', 'Aut nam et eum architecto fugit repellendus illo. Qui ex esse veritatis.', 'Possimus omnis aut incidunt sunt. Asperiores incidunt iure sequi cum culpa rem. Rerum exercitationem est rem.')
//随机生成一个文本
$text = $this->faker()->text($maxNbChars = 200); // 'Fuga totam reiciendis qui architecto fugiat nemo. Consequatur recusandae qui cupiditate eos quod.'
```

### Person 人物

```PHP
//随机生成任务称呼Mrs./Mr./Dr. ...
$title = $this->faker()->title($gender = null | 'male' | 'female'); // 'Ms.'
//随机生成男性称呼
$titleMale = $this->faker()->titleMale; // 'Mr.'
//随机生成女性称呼
$titleFemale = $this->faker()->titleFemale; // 'Ms.'
//随机生成后缀
$suffix = $this->faker()->suffix;  // 'Jr.'
//随机生成姓名
$name = $this->faker()->name($gender = null | 'male' | 'female'); // 'Dr. Zane Stroman'
//随机生成名字
$firstName = $this->faker()->firstName($gender = null | 'male' | 'female'); // 'Maynard'
//随机生成男性 名字
$firstNameMale = $this->faker()->firstNameMale; // 'Maynard'
//随机生成女性 名字
$firstNameFemale = $this->faker()->firstNameFemale; // 'Rachel'
//随机生成姓氏
$lastName = $this->faker()->lastName; // 'Zulauf'
```

### Address 地址

```PHP
//随机生成城市前缀town/port/haven...
 $cityPrefix = $this->faker()->cityPrefix; // 'Lake'
 //
 $secondaryAddress = $this->faker()->secondaryAddress; // 'Suite 961'
 //随机生成省份/州
 $state = $this->faker()->state; // 'NewMexico'
 //随机城市省份/州缩写
 $stateAbbr = $this->faker()->stateAbbr; // 'OH'
 //随机生成城市后缀
 $citySuffix = $this->faker()->citySuffix; // 'borough'
 //随机生成街道后缀
 $streetSuffix = $this->faker()->streetSuffix; // 'Keys'
 //随机生成建筑编号
 $buildingNumber = $this->faker()->buildingNumber; // '484'
 //随机生成城市
 $city = $this->faker()->city; // 'West Judge'
 //随机生成街道名
 $streetName = $this->faker()->streetName;  // 'Keegan Trail'
 //随机生成街道地址
 $streetAddress = $this->faker()->streetAddress; // '439 Karley Loaf Suite 897'
 //随机生成邮编
 $postcode = $this->faker()->postcode; // '17916'
 //随机生成地址
 $address = $this->faker()->address; // '8888 Cummings Vista Apt. 101, Susanbury, NY 95473'
 //随机生成国家
 $country = $this->faker()->country; // 'Falkland Islands (Malvinas)'
 //随机生成纬度
 $latitude = $this->faker()->latitude($min = -90, $max = 90); // 77.147489
 //随机生成经度
 $longitude = $this->faker()->longitude($min = -180, $max = 180); // 86.211205
```

### PhoneNumber 电话号码

```PHP
//生成随机电话号码
$phoneNumber = $this->faker()->phoneNumber; // "(757) 833-3219 x158"
//随机生成免费电话号码
$tollFreePhoneNumber = $this->faker()->tollFreePhoneNumber; // "888-205-1163"
//随机生成e164电话
$e164PhoneNumber = $this->faker()->e164PhoneNumber; // "+8283952638578"
```

### Company 公司

```PHP
//随机生成公司
$company = $this->faker()->company; // "Jacobson-Reichert"
//随机生成公司后缀
$companySuffix = $this->faker()->companySuffix; //  "Inc"
//随机生成职务
$jobTitle = $this->faker()->jobTitle; // "Brazing Machine Operator"
```

### Text 文本

```PHP
//随机生成一段文本
$realText = $this->faker()->realText($maxNbChars = 200, $indexSize = 2); // "And yet I wish you could manage it?) 'And what are they made of?' Alice asked in a shrill, passionate voice. 'Would YOU like cats if you were never even spoke to Time!' 'Perhaps not,' Alice replied."
```

### DateTime 日期时间

```PHP
//随机生成时间戳
$unixTime = $this->faker()->unixTime($max = 'now'); // 58781813
//随机生成时间
$dateTime = $this->faker()->dateTime($max = 'now', $timezone = date_default_timezone_get()); // DateTime('2008-04-25 08:37:17', 'UTC')
$dateTimeAD = $this->faker()->dateTimeAD; // DateTime('1800-04-29 20:38:49', 'Europe/Paris')
//随机生成ios8601时间
$iso8601 = $this->faker()->iso8601($max = 'now'); // '1978-12-09T10:10:29+0000'
//根据格式随机生成日期
$date = $this->faker()->date($format = 'Y-m-d', $max = 'now'); // '1979-06-09'
//根据格式随机生成时间
$time = $this->faker()->time($format = 'H:i:s', $max = 'now'); // '20:49:42'
//生成指定范围的时间
$dateTimeBetween = $this->faker()->dateTimeBetween($startDate = '-30 years', $endDate = 'now'); // DateTime('2003-03-15 02:00:49', 'Africa/Lagos')
//随机生成一个指定间隔的时间
$dateTimeInInterval = $this->faker()->dateTimeInInterval($startDate = '-30 years', $interval = '+ 5 days', $timezone = date_default_timezone_get()); // DateTime('2003-03-15 02:00:49', 'Antartica/Vostok')
//随机生成当前世纪的时间
$dateTimeThisCentury = $this->faker()->dateTimeThisCentury($max = 'now', $timezone = date_default_timezone_get()); // DateTime('1915-05-30 19:28:21', 'UTC')
//随机生成当前十年的时间
$dateTimeThisDecade = $this->faker()->dateTimeThisDecade($max = 'now', $timezone = date_default_timezone_get()); // DateTime('2007-05-29 22:30:48', 'Europe/Paris')
//随机生成当前年的时间
$dateTimeThisYear = $this->faker()->dateTimeThisYear($max = 'now', $timezone = date_default_timezone_get()); // DateTime('2018-02-27 20:52:14', 'Africa/Lagos')
//随机生成当前月的时间
$dateTimeThisMonth = $this->faker()->dateTimeThisMonth($max = 'now', $timezone = date_default_timezone_get()); //DateTime( "2018-06-15 15:44:58.000000", 'PRC')
//随机生成 am/pm
$amPm = $this->faker()->amPm($max = 'now'); //"pm"
//随机生成月份的某一天
$dayOfMonth = $this->faker()->dayOfMonth($max = 'now'); // '04'
//随机生成星期
$dayOfWeek = $this->faker()->dayOfWeek($max = 'now'); // "Monday"
//随机生成月份
$month = $this->faker()->month($max = 'now'); // "05"
//随机生成月份的名称
$monthName = $this->faker()->monthName($max = 'now'); // "June"
//随机生成年份
$year = $this->faker()->year($max = 'now'); // "1980"
//随机生成世纪
$century = $this->faker()->century; // "XXI"
//随机生成时区
$timezone = $this->faker()->timezone; // "Antarctica/Macquarie"
```

### Internet 互联网

```PHP
//随机生成邮箱地址
$email = $this->faker()->email; // "qnikolaus@gmail.com"
//随机生成安全的邮箱地址
$safeEmail = $this->faker()->safeEmail; // "haven12@example.com"
//随机生成免费的邮箱地址
$freeEmail = $this->faker()->freeEmail;// "lhowe@hotmail.com"
//随机生成公司邮箱地址
$companyEmail = $this->faker()->companyEmail; // "yesenia.becker@gulgowski.com"
//随机生成免费邮箱域名
$freeEmailDomain = $this->faker()->freeEmailDomain; // "hotmail.com"
//随机生成安全邮箱域名
$safeEmailDomain = $this->faker()->safeEmailDomain; // "example.org"
//随机生成用户名
$userName = $this->faker()->userName; // "zsatterfield"
//随机生成密码
$password = $this->faker()->password; // "{X*6e'"
//随机生成域名
$domainName = $this->faker()->domainName; // "dare.com"
//随机生成域
$domainWord = $this->faker()->domainWord; // "herman"
$tld = $this->faker()->tld; // "com"
//随机生成url地址
$url = $this->faker()->url; // "<https://johnson.com/eaque-quaerat-unde-hic-laudantium-architecto-fugiat.html>"
//随机生成块
$slug = $this->faker()->slug; // "quaerat-rem-nisi-praesentium-aliquam-recusandae"
//随机生成ipv4地址
$ipv4 = $this->faker()->ipv4; // "19.100.20.103"
//随机生成本地ipv4地址
$localIpv4 = $this->faker()->localIpv4; // "192.168.217.59"
//随机生成ipv6地址
$ipv6 = $this->faker()->ipv6; // "d37c:e26b:9f32:c751:e20:72f3:a7c9:b422"
//随机生成mac地址
$macAddress = $this->faker()->macAddress; // "36:2A:2F:AF:9F:55"
```

### UserAgent 用户代理

```PHP
//用户代理
$userAgent = $this->faker()->userAgent; // 'Mozilla/5.0 (Windows CE) AppleWebKit/5350 (KHTML, like Gecko) Chrome/13.0.888.0 Safari/5350'
//谷歌
$chrome = $this->faker()->chrome; // 'Mozilla/5.0 (Macintosh; PPC Mac OS X 10_6_5) AppleWebKit/5312 (KHTML, like Gecko) Chrome/14.0.894.0 Safari/5312'
//火狐
$firefox = $this->faker()->firefox;  // 'Mozilla/5.0 (X11; Linuxi686; rv:7.0) Gecko/20101231 Firefox/3.6'
//Safari
$safari = $this->faker()->safari;  // 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_1 rv:3.0; en-US) AppleWebKit/534.11.3 (KHTML, like Gecko) Version/4.0 Safari/534.11.3'
//欧朋
$opera = $this->faker()->opera; // 'Opera/8.25 (Windows NT 5.1; en-US) Presto/2.9.188 Version/10.00'
//ie
$internetExplorer = $this->faker()->internetExplorer; // 'Mozilla/5.0 (compatible; MSIE 7.0; Windows 98; Win 9x 4.90; Trident/3.0)'
```

### Payment 支付

```PHP
//随机生成信用卡类型
$creditCardType = $this->faker()->creditCardType; // 'MasterCard'
//随机生成信用卡号
$creditCardNumber = $this->faker()->creditCardNumber; // '4485480221084675'
//随机生成信用卡有效日期
$creditCardExpirationDate = $this->faker()->creditCardExpirationDate; // 04/13
//随机生成信用卡有效日期
$creditCardExpirationDateString = $this->faker()->creditCardExpirationDateString; // '04/13'
//随机生成信用卡明细
$creditCardDetails = $this->faker()->creditCardDetails; // array('MasterCard', '4485480221084675', 'Aleksander Nowak', '04/13')
//随机生成国际银行账号
$iban = $this->faker()->iban($countryCode = null);  // 'IT31A8497112740YZ575DJ28BP4'
$swiftBicNumber = $this->faker()->swiftBicNumber; // 'RZTIAT22263'
```

### Color 颜色

```PHP
//随机生成16进制颜色
$hexColor = $this->faker()->hexColor; // '#fa3cc2'
//随机生成rgb格式的颜色
$rgbColor = $this->faker()->rgbColor; // '0,255,122'
//随机生成数组格式的rgb颜色
$rgbColorAsArray = $this->faker()->rgbColorAsArray; // array(0,255,122)
//随机生成css格式的rgb颜色
$rgbCssColor = $this->faker()->rgbCssColor; // 'rgb(0,255,122)'
//随机生成颜色名称
$safeColorName = $this->faker()->safeColorName;  // 'fuchsia'
$colorName     = $this->faker()->colorName; // 'Gainsbor'
```

### File 文件

```PHP
//随机生成文件扩展名
$fileExtension = $this->faker()->fileExtension; // 'avi'
//随机生成mime类型
$mimeType = $this->faker()->mimeType; // 'video/x-msvideo'
//将一个随机文件从源文件复制到目标目录，并返回fullpath或filename
$fullPath = $this->faker()->file($sourceDir = '/tmp', $targetDir = '/var'); // '/path/to/targetDir/13b73edae8443990be1aa8f1a483bc27.jpg'
$fileName = $this->faker()->file($sourceDir = '/tmp', $targetDir = '/var', false); // '13b73edae8443990be1aa8f1a483bc27.jpg'
```

### Image 图片

```PHP
//随机生成图片地址
$imageUrl = $this->faker()->imageUrl($width = 640, $height = 480); // "<https://lorempixel.com/640/480/?85309>"
$this->faker()->imageUrl($width = 640, $height = 480, 'cats'); // "<https://lorempixel.com/640/480/cats/?24879>"
$this->faker()->imageUrl($width = 640, $height = 480, 'cats', true, 'Faker'); // "<https://lorempixel.com/640/480/cats/Faker/?24090>"
$this->faker()->imageUrl($width = 640, $height = 480, 'cats', true, 'Faker', true); // "<https://lorempixel.com/gray/640/480/cats/Faker/?50629>"
//随机生成一张图片,返回图片路径
$image = $this->faker()->image($dir = '/var/www', $width = 640, $height = 480); // "/var/www/0b8e55ac992d435a2735abf15eb8259f.jpg"
//按类型随机生成图片,返回图片地址
$imageCats = $this->faker()->image($dir = '/var/www', $width = 640, $height = 480, 'cats'); // "/var/www/2784d94db389e7a00777d15e4e28af1c.jpg"
//按类型生成图片,不返回图片路径
$imageNoPath = $this->faker()->image($dir = '/var/www', $width = 640, $height = 480, 'cats', false); // "2784d94db389e7a00777d15e4e28af1c.jpg"
$imageNoRandomize = $this->faker()->image($dir = '/var/www', $width = 640, $height = 480, 'cats', true, false); // "/var/www/a73aa742ab5cf0be6e807268454efcd0.jpg"
$imageFaker = $this->faker()->image($dir = '/var/www', $width = 640, $height = 480, 'cats', true, true, 'Faker'); // "/var/www/b694cb5bf255fc20a78ecf6e37788246.jpg"
```

### Uuid UUID

```PHP
//随机生成一个唯一字串
$uuid = $this->faker()->uuid; // "04c975c1-48c2-3730-a4e9-139fe66ee9c0"
```

### Barcode 条形码

```PHP
//随机生成13位ean码
$ean13  = $this->faker()->ean13; // '4006381333931'
//随机生成8位ean码
$ean8   = $this->faker()->ean8; // '73513537'
//随机生成13位isbn码
$isbn13 = $this->faker()->isbn13; // '9790404436093'
//随机生成10位isbn码
$isbn10 = $this->faker()->isbn10; // '4881416324'
```

### Miscellaneous 各种各样的

```PHP
//随机生成bool值 false
$boolean = $this->faker()->boolean;
//平衡的生成bool值
$boolBalance = $this->faker()->boolean($chanceOfGettingTrue = 50); //false
$md5    = $this->faker()->md5; // 'de99a620c50f2990e87144735cd357e7'
$sha1   = $this->faker()->sha1; // 'f08e7f04ca1a413807ebc47551a40a20a0b4de5c'
$sha256 = $this->faker()->sha256; // '0061e4c60dac5c1d82db0135a42e00c89ae3a333e7c26485321f24348c7e98a5'
$locale = $this->faker()->locale; // en_UK
//随机生成国家编码
$countryCode = $this->faker()->countryCode; // UK
//随机生成语言编码
$languageCode = $this->faker()->languageCode; // en
//随机生成货币代码
$currencyCode = $this->faker()->currencyCode; // EUR
//生成emoji表情
$emoji = $this->faker()->emoji; // 😁
```

### Biased 偏向的

```PHP
//在10到20之间得到一个随机数，有更多的几率接近20
$biasedNum = $this->faker()->biasedNumberBetween($min = 10, $max = 20, $function = 'sqrt'); //15
```

### HtmlLorem html 文本

```PHP
//随机生成一个不超过 $maxDepth层的html, 任何级别上都不超过$maxWidth个元素
$html = $this->faker()->randomHtml($maxDepth = 2, $maxWidth = 3); 
// <html><head><title>Aut illo dolorem et accusantium eum.</title></head><body><form action="example.com" method="POST"><label for="username">sequi</label><input type="text" id="username"><label for="password">et</label><input type="password" id="password"></form><b>Id aut saepe non mollitia voluptas voluptas.</b>***<td>Quidem corrupti ea.</td><td>Cum voluptas quod.</td><td>Possimus consequatur quasi dolorem ut et.</td><td>Et velit non hic labore repudiandae quis.</td></tr></tbody></table></body></html>
```

## Modifiers 修改器

Faker 提供三个特殊的提供者 providers, unique(), optional(), valid(), 在任何提供者之前调用。.

```PHP
// unique() 强制 providers 返回一个唯一的值
$values = array();
for ($i=0; $i < 10; $i++) {
  // 得到一个随机数字，但总是一个新的，以避免重复
  $values []= $faker->unique()->randomDigit;
}
print_r($values); // [4, 1, 8, 5, 0, 2, 6, 9, 7, 3]
// 只有有限范围的提供者才会抛出一个异常，当没有新的惟一值时
$values = array();
try {
  for ($i=0; $i < 10; $i++) {
    $values []= $faker->unique()->randomDigitNotNull;
  }
} catch (\\OverflowException $e) {
  echo "There are only 9 unique digits not null, Faker can't generate 10 of them!";
}
// 您可以通过传递true作为第一个参数来重置所有提供者的惟一修饰符
$faker->unique($reset = true)->randomDigitNotNull; // 不会抛出 OverflowException 异常 因为 unique() 被重置
// 提示: unique() 每个提供者都保留一个值数组
// optional() 有时绕过提供者返回一个默认值(默认值为NULL)
$values = array();
for ($i=0; $i < 10; $i++) {
  // 得到一个随机数字，但有时也为空
  $values []= $faker->optional()->randomDigit;
}
print_r($values); // [1, 4, null, 9, 5, null, null, 4, 6, null]
// optional() 接受一个权重参数来指定接收默认值的概率。
// 0 总是返回默认值;1将始终返回提供者。默认的权重是0.5(50%的几率)。
$faker->optional($weight = 0.1)->randomDigit; // 90% chance of NULL
$faker->optional($weight = 0.9)->randomDigit; // 10% chance of NULL
// optional() 接受默认参数，以指定要返回的默认值。
// 默认为空。
$faker->optional($weight = 0.5, $default = false)->randomDigit; // 50% chance of FALSE
$faker->optional($weight = 0.9, $default = 'abc')->word; // 10% chance of 'abc'
// valid() 只根据传递的验证器函数接受有效值
$values = array();
$evenValidator = function($digit) {
    return $digit % 2 === 0;
};
for ($i=0; $i < 10; $i++) {
    $values []= $faker->valid($evenValidator)->randomDigit;
}
print_r($values); // [0, 4, 8, 4, 2, 6, 0, 8, 8, 6]
// 就像 unique(), valid() 当它不能产生有效值时抛出一个溢出异常
$values = array();
try {
  $faker->valid($evenValidator)->randomElement(1, 3, 5, 7, 9);
} catch (\\OverflowException $e) {
  echo "Can't pick an even number in that set!";
}
```