
from helpers.bit_operation_helper import BitOperationHelper

boh = BitOperationHelper()
a = 0xA2

print()

output_string = ""
output_string += f"0x{a:002X} "
output_string += f"gmul2 = 0x{boh.gmul(a, 2):002X} : {boh.gmul(a, 2)} | "
output_string += f"gmul3 = 0x{boh.gmul(a, 3):002X} : {boh.gmul(a, 3)} | "
output_string += f"gmul4 = 0x{boh.gmul(a, 4):002X} : {boh.gmul(a, 4)} | "
output_string += f"gmul5 = 0x{boh.gmul(a, 5):002X} : {boh.gmul(a, 5)} | "

print(output_string)