
from helpers.bit_operation_helper import BitOperationHelper

boh = BitOperationHelper()
a = 0xA2

print()
print(f"0x{a:002X} gmul2 = 0x{boh.gmul2(a):002X} | gmul3 = 0x{boh.gmul3(a):002X}")