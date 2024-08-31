import argparse

from helpers.bit_operation_helper import BitOperationHelper


parser = argparse.ArgumentParser()
parser.add_argument("-a", "--a", help="A")
parser.add_argument("-b", "--b", help="B")
cli_args = vars(parser.parse_args())

a = int(cli_args.get('a'))
b = int(cli_args.get('b'))

boh = BitOperationHelper()

expected = a + b
actual = boh.bitwise_add(a, b)

print(f"is {a} + {b} = {expected} ? {expected == actual} ({actual})")