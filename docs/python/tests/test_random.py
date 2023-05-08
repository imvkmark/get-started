import random
import unittest


class TestRandom(unittest.TestCase):

    def setUp(self) -> None:
        self.suit = ['a', 'b', 'c']

    def testRandom(self):
        """测试随机数"""

        # 随机生成一个 0-1之间的浮点数
        self.assertTrue(0 < random.random() < 1)

        # 返回 1-10 之间随机整数
        self.assertTrue(1 <= random.randint(1, 10) <= 10)

        # 多选一, 从列表中选取
        print(random.choice(self.suit))

        # 将列表摇匀/随机排序
        random.shuffle(self.suit)
        print(self.suit)


if __name__ == '__main__':
    unittest.main()
