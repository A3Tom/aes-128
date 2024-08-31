import sys

from helpers.bit_operation_helper import BitOperationHelper

boh = BitOperationHelper()

def get_next_base_2(var: int) -> int:
    var -= 1
    var |= var >> 1
    var |= var >> 2
    var |= var >> 4
    var |= var >> 8
    var |= var >> 16
    var += 1
    return var

def shift_right(input: int, bitshift_amount: int) -> int:
    bitshifted_var = input >> bitshift_amount
    missing_bits = input << (bit_amount - bitshift_amount) & bit_cap_mask
    return bitshifted_var | missing_bits

def shift_left(input: int, bitshift_amount: int) -> int:
    bitshifted_var = (input << bitshift_amount) & bit_cap_mask
    missing_bits = input >> bit_amount - bitshift_amount 
    return bitshifted_var | missing_bits

def parse_input_bit_amount(input: int) -> int:
    return get_next_base_2(len(bin(input)[2:]))

def parse_bit_cap_mask(bit_amount: int) -> int:
    return pow(2, bit_amount) - 1

args = sys.argv[1:]
test_var = 0b1011110000111100001111000011110000
bitshift_amount = int(args[0]) if len(args) > 0 else 1

bit_amount = parse_input_bit_amount(test_var)
bit_cap_mask = parse_bit_cap_mask(bit_amount)

bitshifted_var = 0b0
missing_bits = 0b0
result = 0b0

if bitshift_amount > 0:
    result = boh.circular_shift_right(test_var, bitshift_amount)
else:
    result = boh.circular_shift_left(test_var, abs(bitshift_amount))

print()
print(f"Bitshift amount: {bitshift_amount} | var length: {len(bin(test_var)[2:])}")
print(f"original: {test_var:0{bit_amount}b}")
print(f"bitshift: {bitshifted_var:0{bit_amount}b}")
print(f"missing:  {missing_bits:0{bit_amount}b}")
print(f"mask:     {bit_cap_mask:0{bit_amount}b}")
print(f"result:   {result:0{bit_amount}b}")
