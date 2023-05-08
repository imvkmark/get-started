import decimal
import math
import unittest


class TestNumeric(unittest.TestCase):

    def setUp(self):
        self.a = 2
        self.b = 4
        self.c = 8

    def test_basic(self):
        """基础运算"""
        self.assertEqual(self.a + self.b, 6)
        self.assertEqual(self.a - self.b, -2)
        self.assertEqual(self.a * self.b, 8)
        self.assertEqual(self.a / self.b, 0.5)
        # 取余 & 幂运算
        self.assertEqual(self.a % 2, 0)
        self.assertEqual(self.a ** 2, 4)
        # 小数运算
        self.assertEqual(self.a + 4.0, 6.0)
        self.assertEqual(2.0 ** self.b, 16)
        # 运算符分组
        self.assertEqual(self.a / 2 + self.b, 5)
        self.assertEqual(self.a / (2.0 + self.b), 1 / 3)

    def test_compare(self):
        """比较和链式比较"""
        self.assertTrue(2 > 1)
        self.assertFalse(2 < 1)

        self.assertTrue(1.0 == 1.0)
        self.assertFalse(1.0 != 1.0)

        # 链式操作 & 链式操作可以简化为第一种写法
        self.assertTrue(self.a < self.b < self.c)
        self.assertTrue(self.a < self.b and self.b < self.c)

        self.assertFalse(self.a < self.b > self.c)
        self.assertFalse(self.a < self.b and self.b > self.c)

        # 支持更多的链式长度
        self.assertTrue(self.a < self.b < self.c < 10)
        self.assertFalse(self.a < self.b < self.c > 10)

        # 比较晦涩的写法 ( 1 == 2 and 2 < 3 )
        self.assertFalse(1 == 2 < 3)

        # 浮点数比较
        # 浮点数不能精确到我们预期的位数进行运算
        self.assertNotEqual(1.1 + 2.2, 3.3)
        self.assertEqual(int(1.1 + 2.2), int(3.3))

    def test_divide(self):
        """除法运算"""
        # 经典除法
        self.assertTrue(0.32 < 1 / 3 < 0.34)

        # 向下取整 | 这个'!!!不是截断除法!!!'
        self.assertEqual(4 // 1.2, 3)
        self.assertEqual(int(4 / 1.2), 3)

        # 对于正数的截断除法和向下取整结果一致
        self.assertEqual(math.trunc(4 / 1.2), 3)

        self.assertEqual(10 / 2.0, 5)
        self.assertEqual(10 / 2, 5)

        # 复数的向下取整是比当前数字小的最接近整数
        self.assertEqual(5 // -2, -3)

    def test_base(self):
        """进制, 字面量和转换, 这里 16 进制字母建议使用小写"""

        # 二进制
        self.assertEqual(0b1, 1)
        self.assertEqual(0b10000, 16)
        self.assertEqual(0b11111111, 255)

        # 八进制
        self.assertEqual(0o1, 1)
        self.assertEqual(0o20, 16)
        self.assertEqual(0o377, 255)

        # 十六进制
        self.assertEqual(0x1, 1)
        self.assertEqual(0x10, 16)
        self.assertEqual(0xff, 255)

        # 换算
        self.assertEqual(0xff, 15 * (16 ** 1) + 15 * (16 ** 0))
        self.assertEqual(0o377, 3 * (8 ** 2) + 7 * (8 ** 1) + 7 * (8 ** 0))
        self.assertEqual(0b11111111,
                         1 * (2 ** 7) + 1 * (2 ** 6) + 1 * (2 ** 5) + 1 * (2 ** 4) +
                         1 * (2 ** 3) + 1 * (2 ** 2) + 1 * (2 ** 1) + 1 * (2 ** 0)
                         )

        # 以字串形式展示进制结果
        self.assertEqual('0xff', hex(255))  # 这里转换的是小写, 所以为了避免问题建议项目中 16 进制使用小写
        self.assertEqual('0o377', oct(255))
        self.assertEqual('0b11111111', bin(255))

        # 将字串类型的数值换换为数值, 这个操作会比 int 慢
        # 因为这个会把代码作为一个片段来运行
        self.assertEqual(eval('0b11111111'), 255)

        # 通过 int 做进制转换
        self.assertEqual(int('0b11111111', 2), 255)

        # 格式化数值, 返回数字, 而不是字符串变量
        self.assertEqual('ff', ('%x' % 255))

    def test_bit(self):
        """位运算, 对于位"""
        # 左移
        self.assertEqual(0b000011000000, 0b000000001100 << 4)
        # 或
        self.assertEqual(0b1101, 0b0001 | 0b1100)
        # 与
        self.assertEqual(0b1101, 0b1111 & 0b1101)
        # 异或
        self.assertEqual(0b1101, 0b0011 ^ 0b1110)

        # bitLength 位长度
        self.assertEqual(8, (255).bit_length())
        self.assertEqual(8, len(bin(255)) - 2)

    def test_inter(self):
        """内置数值工具"""

        # PI
        self.assertEqual('3.14', str(math.pi)[0:4])
        self.assertEqual('2.71828', str(math.e)[0:7])

        # 三角函数, 暂不测试
        # sin, sinh, asin, asinh
        # cos, cosh, acos, acosh

        # 平方根
        self.assertEqual(12, math.sqrt(144))
        # 幂运算
        self.assertEqual(math.pow(2, 4), 2 ** 4)
        # 绝对值, 不需要导入
        self.assertEqual(abs(-5), 5)
        # 求和
        self.assertEqual(sum((1, 2, 3, 4)), 10)
        self.assertEqual(sum([1, 2, 3, 4]), 10)  # 列表竟然也可以

        # 最小值
        self.assertEqual(min(1, 2, 3, 4), 1)
        # 最大值
        self.assertEqual(max(1, 2, 3, 4), 4)

        # 小于当前值的整数
        self.assertEqual(math.floor(2.5), 2)
        self.assertEqual(math.floor(-2.5), -3)

        # 切断整数
        self.assertEqual(math.trunc(2.5), 2)
        self.assertEqual(math.trunc(-2.5), -2)

        # int 取整, 截断取整
        self.assertEqual(int(2.5), 2)
        self.assertEqual(int(-2.5), -2)

        # 四舍五入
        self.assertEqual(round(2.71828), 3)
        self.assertEqual(round(2.41828), 2)
        self.assertEqual(round(2.71828, 2), 2.72)

        # 格式化
        # % 代表变量
        self.assertEqual('2.6', '%.1f' % 2.567)
        # 0 代表变量 ? 后边会学 format
        self.assertEqual('2.6', '{0:.1f}'.format(2.567))

        # 计算平方根的三种方式
        self.assertEqual(12, math.sqrt(144))
        self.assertEqual(12, 144 ** .5)
        self.assertEqual(12, pow(144, .5))

    def test_decimal(self):
        """因为浮点数计算的天然劣势, 所以我们需要更精准的计算方式来计算浮点数"""

        # decimal 返回的是 Decimal 类型
        # 为了直观看起来,我们这里直接使用模块前缀来进行访问 Decimal
        self.assertEqual('0.1', str(decimal.Decimal('0.1')))


if __name__ == '__main__':
    unittest.main()
