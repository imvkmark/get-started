import json
import unittest


class TestJson(unittest.TestCase):

    def testDumps(self):
        # python: object 转换为 string
        json_object = {
            'name': 'duoli',
            'site': 'https://wulicode.com'
        }
        json_str = json.dumps(json_object)
        # true
        self.assertTrue(json_str.startswith('{'))
