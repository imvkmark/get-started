import unittest


class TestString(unittest.TestCase):

    def setUp(self):
        self.spam = 'spam'
        self.b = 2

    def test_repr(self):
        """code form, 看起来更像代码"""
        self.assertEqual(repr(self.spam), "'spam'")

    def test_str(self):
        """对用户更加友好的字符串模式"""
        self.assertEqual(str(self.spam), "spam")


if __name__ == '__main__':
    unittest.main()
